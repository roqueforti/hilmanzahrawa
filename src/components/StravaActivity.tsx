'use client';

import { motion } from "framer-motion";
import { Activity, Clock, Calendar, Zap, Users, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface StravaActivityProps {
  activities: any[];
  stats?: any;
  profile?: any;
  clubs?: any[];
}

export default function StravaActivity({ activities, stats, profile, clubs }: StravaActivityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgPath, setSvgPath] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const prevCountRef = useRef(0);
  const COLUMNS = 4;

  // Move early return down or handle in rendering to avoid hook order issues
  const hasData = activities && activities.length > 0;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDistance = (meters: number) => {
    return (meters / 1000).toFixed(2) + " km";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Polyline Decoder
  const decodePolyline = (encoded: string) => {
    if (!encoded) return [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;
    const points = [];
    while (index < len) {
      let b, shift = 0, result = 0;
      do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
      let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;
      shift = 0; result = 0;
      do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
      let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;
      points.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }
    return points;
  };

  const ActivityPath = ({ polyline }: { polyline: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !polyline) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const points = decodePolyline(polyline);
      if (points.length === 0) return;

      // Fit points to canvas
      const lats = points.map(p => p.lat);
      const lngs = points.map(p => p.lng);
      const minLat = Math.min(...lats), maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
      
      const padding = 10;
      const w = canvas.width - padding * 2;
      const h = canvas.height - padding * 2;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = '#bb86fc';
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      points.forEach((p, i) => {
        const x = padding + ((p.lng - minLng) / (maxLng - minLng || 1)) * w;
        // Flip Y as canvas Y is down
        const y = padding + (1 - (p.lat - minLat) / (maxLat - minLat || 1)) * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }, [polyline]);

    return <canvas ref={canvasRef} width={200} height={100} style={{ width: '100%', height: '80px', opacity: 0.4 }} />;
  };

  // Sort by date newest first
  const sortedActivities = [...activities].sort((a, b) => 
    new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );

  // Pagination logic: Slice to visible count
  const displayedActivities = sortedActivities.slice(0, visibleCount);

  // Snake Logic for 4 Columns
  const snakedActivities: any[] = [];
  for (let i = 0; i < displayedActivities.length; i += COLUMNS) {
    const row = displayedActivities.slice(i, i + COLUMNS);
    const rowIndex = Math.floor(i / COLUMNS);
    if (rowIndex % 2 !== 0) {
      // Row is ODD (R -> L)
      // To make it look "natural" and connect vertically from the last row's end,
      // we pad the beginning if it is not a full row.
      const reversed = row.reverse();
      const padding = Array(COLUMNS - reversed.length).fill(null);
      // For R -> L, we pad on the LEFT in the grid to stay right-aligned
      snakedActivities.push(...padding, ...reversed);
    } else {
      snakedActivities.push(...row);
    }
  }

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || activities.length === 0) return;
      
      const cards = containerRef.current.querySelectorAll('.snake-card-content');
      if (cards.length < 2) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const points: {x: number, y: number}[] = [];

      // We need to follow the sequence 0, 1, 2, 3, 4... IN ORDER of sortedActivities
      // But they are placed in different cards.
      // Let's find each card by its 'data-index'
      for (let i = 0; i < sortedActivities.length; i++) {
        const card = containerRef.current.querySelector(`[data-original-index="${i}"]`);
        if (card) {
          const rect = card.getBoundingClientRect();
          points.push({
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2
          });
        }
      }

      if (points.length < 2) return;

      let d = `M ${points[0].x} ${points[0].y}`;
      
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i+1];
        
        // Calculate control points for a smooth curve
        // If it's a horizontal move
        if (Math.abs(p0.y - p1.y) < 50) {
          d += ` L ${p1.x} ${p1.y}`;
        } else {
          // Vertical turn (snake bend)
          const midY = (p0.y + p1.y) / 2;
          d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
        }
      }
      setSvgPath(d);
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, [displayedActivities.length]);

  // Update previous count after render
  useEffect(() => {
    prevCountRef.current = displayedActivities.length;
  }, [displayedActivities.length]);

  if (!hasData) return null;

  // Animation calculation for the path growth
  const prevCount = prevCountRef.current;
  const currCount = displayedActivities.length;
  const initialLength = prevCount > 0 ? (prevCount - 1) / (currCount - 1) : 0;
  
  // Transition timing: start from the first new card's delay
  // Duration covers the time for all new cards to appear
  const startDelay = prevCount * 0.05;
  const animationDuration = (currCount - prevCount) * 0.15 + 0.5;

  return (
    <div style={{ marginTop: '3rem', width: '100%', padding: '1rem 0' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .snake-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6rem 2.5rem;
          position: relative;
        }
        
        .snake-card {
          position: relative;
          z-index: 2;
        }

        @media (max-width: 1023px) {
          .snake-grid { grid-template-columns: 1fr; gap: 3rem; }
          .snake-svg { display: none; }
        }
      `}} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '4rem' }}>
        <div style={{ width: '1.8rem', height: '1.8rem', borderRadius: '50%', background: 'rgba(187, 134, 252, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Activity size={16} className="text-accent" />
        </div>
        <div>
          <h2 className="text-heading-compact" style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>STRAVA ACTIVITIES</h2>
          <p style={{ fontSize: '0.65rem', opacity: 0.5, marginTop: '0.2rem' }}>Personal sports tracking and milestones</p>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
        {/* Stats Dashboard */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '1rem' }}>
            <Zap size={16} className="text-accent" />
            <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>All-time Distance</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>{stats ? (stats.all_run_totals?.distance / 1000).toFixed(0) : '0'} <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>km</span></div>
          <div style={{ fontSize: '0.6rem', opacity: 0.5, marginTop: '0.5rem' }}>Total coverage across all activities</div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '1rem' }}>
            <Clock size={16} className="text-accent" />
            <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Moving Time</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>{stats ? Math.floor(stats.all_run_totals?.moving_time / 3600) : '0'} <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>hrs</span></div>
          <div style={{ fontSize: '0.6rem', opacity: 0.5, marginTop: '0.5rem' }}>Consistent time on the road</div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '1rem' }}>
            <Trophy size={16} className="text-accent" />
            <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Achievements</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>{stats?.all_run_totals?.count || '0'}</div>
          <div style={{ fontSize: '0.6rem', opacity: 0.5, marginTop: '0.5rem' }}>Total recorded activities</div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '1rem' }}>
            <Users size={16} className="text-accent" />
            <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Clubs</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {clubs && clubs.length > 0 ? clubs.slice(0, 3).map((club: any) => (
              <div key={club.id} style={{ width: '1.8rem', height: '1.8rem', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src={club.profile_medium} alt={club.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )) : <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Join more clubs</span>}
          </div>
          <div style={{ fontSize: '0.6rem', opacity: 0.5, marginTop: '0.8rem' }}>Connected with {clubs?.length || 0} communities</div>
        </div>
      </div>
      
      <div ref={containerRef} style={{ position: 'relative' }}>
        {/* The Continuous Snake Line */}
        <svg 
          className="snake-svg"
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          <motion.path 
            key={visibleCount}
            d={svgPath}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeOpacity="0.15"
            strokeDasharray="8 8"
            initial={{ pathLength: initialLength }}
            animate={{ pathLength: 1 }}
            transition={{ 
              delay: startDelay, 
              duration: animationDuration, 
              ease: "linear" 
            }}
          />
        </svg>

        <div className="snake-grid">
          {snakedActivities.map((item, idx) => {
            if (!item) return <div key={`empty-${idx}`} style={{ minHeight: '220px' }} />;
            
            // Find original index for sequencing
            const displayIdx = sortedActivities.findIndex(a => a.id === item.id);
            
            // Reversed numbering: Newest activity should have the highest number
            // Item 0 (newest) -> Number: Total
            // Item N (oldest) -> Number: 1
            const sequenceNumber = sortedActivities.length - displayIdx;
            
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: displayIdx * 0.05 }}
                className="snake-card"
              >
                <div 
                  className="snake-card-content" 
                  data-original-index={displayIdx}
                  style={{ 
                    background: 'var(--bg-secondary)', 
                    border: '1px solid var(--border-light)', 
                    padding: '1.5rem', 
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '220px',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                    position: 'relative',
                    zIndex: 2,
                    overflow: 'hidden'
                  }}
                >
                  {/* Activity Map / Photo Background */}
                  <div style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '110px', 
                    background: 'rgba(255,255,255,0.02)',
                    zIndex: -1,
                    overflow: 'hidden'
                  }}>
                    {item.primary_photo ? (
                      <img 
                        src={item.primary_photo} 
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
                      />
                    ) : item.map?.summary_polyline && (
                      <ActivityPath polyline={item.map.summary_polyline} />
                    )}
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '40px', 
                      background: 'linear-gradient(to bottom, transparent, var(--bg-secondary))' 
                    }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                    <div style={{ 
                      width: '2.2rem', 
                      height: '2.2rem', 
                      borderRadius: '50%', 
                      background: 'var(--bg-primary)', 
                      border: '2px solid var(--accent)',
                      color: 'var(--accent)',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 900,
                      fontFamily: 'var(--font-mono)',
                      boxShadow: '0 0 20px rgba(187, 134, 252, 0.2)'
                    }}>
                      {sequenceNumber.toString().padStart(2, '0')}
                    </div>
                    <div style={{ 
                      fontSize: '0.6rem', 
                      fontWeight: 800, 
                      textTransform: 'uppercase', 
                      padding: '0.3rem 0.6rem', 
                      background: 'rgba(255,255,255,0.03)', 
                      color: 'var(--text-muted)', 
                      borderRadius: '4px',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      {item.type}
                    </div>
                  </div>

                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.4, color: 'var(--text-primary)' }}>{item.name}</h4>

                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Distance</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{formatDistance(item.distance)}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Duration</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{formatTime(item.moving_time)}</span>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '1.2rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={12} /> {formatDate(item.start_date)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Load More Button */}
        {visibleCount < sortedActivities.length && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <button 
              onClick={() => setVisibleCount(prev => Math.min(prev + 12, sortedActivities.length))}
              style={{
                background: 'rgba(187, 134, 252, 0.1)',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                padding: '0.8rem 2rem',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.color = 'var(--bg-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(187, 134, 252, 0.1)';
                e.currentTarget.style.color = 'var(--accent)';
              }}
            >
              Load More Activities
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
