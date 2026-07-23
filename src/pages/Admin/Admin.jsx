import React, { useState, useEffect } from 'react';
import { LogOut, Calendar, Search, Filter, BookOpen, Phone, Mail, MessageSquare, MoreVertical, User, RefreshCw, Lock, Eye, EyeOff, BarChart2, Clock, ShieldCheck, LogIn, Download } from 'lucide-react';
import './Admin.css';
import studentsImage from '../../assets/images/students_image.jpg';

let memoryAuth = false;

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const localAuth = localStorage.getItem('adminAuth');
    const sessionAuth = sessionStorage.getItem('adminAuth');
    if (localAuth === 'true' || sessionAuth === 'true' || memoryAuth) {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    const data = JSON.parse(localStorage.getItem('registrations') || '[]');
    setRegistrations(data.reverse()); // Show newest first
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'abhitutions@gmail.com' && password === 'Abhi@123') {
      setIsAuthenticated(true);
      if (rememberMe) {
        localStorage.setItem('adminAuth', 'true');
      } else {
        memoryAuth = true;
        // Optionally use sessionStorage so it survives an accidental refresh, 
        // but if they explicitly want logout on refresh, memoryAuth is better alone.
        // We will set sessionAuth as well just in case they prefer standard session behavior.
        sessionStorage.setItem('adminAuth', 'true');
      }
      setError('');
      loadData();
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminAuth');
    memoryAuth = false;
    setUsername('');
    setPassword('');
  };
  
  const exportData = () => {
    if (registrations.length === 0) return;
    
    const headers = ['Date', 'Time', 'Student Name', 'Parent Name', 'Grade', 'Subjects', 'Phone', 'Email', 'Message'];
    const csvRows = [headers.join(',')];

    registrations.forEach(reg => {
      const { date, time } = formatDate(reg.timestamp);
      const row = [
        `"${date}"`, 
        `"${time}"`, 
        `"${(reg.name || '').replace(/"/g, '""')}"`, 
        `"${(reg.parentName || '').replace(/"/g, '""')}"`, 
        `"${(reg.grade || '').toString().replace(/"/g, '""')}"`, 
        `"${(reg.subjects || '').replace(/"/g, '""')}"`, 
        `"${(reg.phone || '').replace(/"/g, '""')}"`, 
        `"${(reg.email || '').replace(/"/g, '""')}"`, 
        `"${(reg.message || '').replace(/"/g, '""')}"`
      ];
      csvRows.push(row.join(','));
    });

    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filter and paginate
  const filteredData = registrations.filter(reg => {
    const searchLower = searchTerm.toLowerCase();
    return (reg.name || '').toLowerCase().includes(searchLower) || 
           (reg.parentName || '').toLowerCase().includes(searchLower) ||
           (reg.email || '').toLowerCase().includes(searchLower) ||
           (reg.phone || '').toLowerCase().includes(searchLower);
  });
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const formatDate = (dateString) => {
    if (!dateString) return { date: '-', time: '-' };
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getGradeColorClass = (grade) => {
    const gradeNum = parseInt(grade, 10);
    if (isNaN(gradeNum)) return 'grade-default';
    if (gradeNum <= 5) return 'grade-5';
    if (gradeNum === 6) return 'grade-6';
    if (gradeNum === 7) return 'grade-7';
    if (gradeNum === 8) return 'grade-8';
    if (gradeNum === 9) return 'grade-9';
    return 'grade-10';
  };

  const getSubjectColorClass = (subjects) => {
    const sub = (subjects || '').toLowerCase();
    if (sub.includes('math')) return 'subject-math';
    if (sub.includes('science')) return 'subject-science';
    return 'subject-default';
  };

  if (!isAuthenticated) {
    return (
      <main className="admin-login-page">
        <div className="admin-login-layout">
          {/* Left Side Content */}
          <div className="admin-login-info">
            <div className="admin-login-shield-icon">
              <User size={32} color="#3b82f6" />
            </div>
            <h1 className="admin-login-main-title">Welcome Back!</h1>
            <p className="admin-login-main-subtitle">
              Sign in to access the admin portal and manage registrations with ease.
            </p>
            <div className="admin-login-divider"></div>

            <div className="admin-features">
              <div className="admin-feature-item">
                <div className="admin-feature-icon">
                  <Lock size={18} />
                </div>
                <div>
                  <h4>Secure Access</h4>
                  <p>Your data is protected with strong encryption</p>
                </div>
              </div>
              <div className="admin-feature-item">
                <div className="admin-feature-icon">
                  <BarChart2 size={18} />
                </div>
                <div>
                  <h4>Manage Easily</h4>
                  <p>View and manage all registrations in one place</p>
                </div>
              </div>
              <div className="admin-feature-item">
                <div className="admin-feature-icon">
                  <Clock size={18} />
                </div>
                <div>
                  <h4>Save Time</h4>
                  <p>Streamlined dashboard for better productivity</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="admin-login-form-container">
            <div className="admin-login-card">
              <h2 className="admin-login-title">Admin Login</h2>
              <p className="admin-login-subtitle">Enter your credentials to continue</p>
              
              <div className="admin-login-form-divider"></div>

              {error && <div className="admin-error">{error}</div>}
              
              <form onSubmit={handleLogin} className="admin-form">
                <div className="admin-field">
                  <label>Username</label>
                  <div className="admin-input-wrapper">
                    <User size={18} className="admin-input-icon" />
                    <input
                      type="email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="admin-field">
                  <label>Password</label>
                  <div className="admin-input-wrapper">
                    <Lock size={18} className="admin-input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                    <button 
                      type="button" 
                      className="admin-toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>

                <div className="admin-form-options">
                  <label className="admin-remember-me">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="admin-forgot-password">Forgot Password?</a>
                </div>

                <button type="submit" className="admin-submit-btn">
                  <LogIn size={18} className="btn-icon" /> Login
                </button>
              </form>

              <div className="admin-login-footer">
                <ShieldCheck size={16} color="#10b981" />
                <span>Secure admin access</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-dashboard">
      <div className="admin-hero" style={{ backgroundImage: `url(${studentsImage})` }}>
        <div className="admin-hero-overlay"></div>
        <div className="admin-hero-content">
          <div className="admin-hero-text">
            <div className="admin-welcome"><User size={16} /> WELCOME, ADMIN</div>
            <h1 className="admin-title">Customer Registrations</h1>
            <p className="admin-subtitle">View and manage all student registration submissions</p>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div className="admin-content-wrapper">
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-header-title">
              <div className="admin-icon-wrapper">
                <Calendar size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h2>Registrations Overview</h2>
                <p>Total {filteredData.length} registrations found</p>
              </div>
            </div>
            
            <div className="admin-header-actions">
              <div className="admin-search">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search by student name, parent name..." 
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                />
              </div>
              <button className="admin-refresh-btn" onClick={loadData} title="Refresh Data">
                <RefreshCw size={16} />
              </button>
              <button className="admin-filter-btn" onClick={exportData} title="Export to CSV">
                <Download size={16} /> Export
              </button>
              <button className="admin-filter-btn">
                <Filter size={16} /> Filters
              </button>
            </div>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date ↑↓</th>
                  <th>Student Name ↑↓</th>
                  <th>Parent Name ↑↓</th>
                  <th>Grade ↑↓</th>
                  <th>Subjects ↑↓</th>
                  <th>Phone ↑↓</th>
                  <th>Email ↑↓</th>
                  <th>Message ↑↓</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="admin-empty">No registrations found.</td>
                  </tr>
                ) : (
                  paginatedData.map((reg, index) => {
                    const { date, time } = formatDate(reg.timestamp);
                    return (
                      <tr key={index}>
                        <td>
                          <div className="admin-cell-date">
                            <Calendar size={14} className="cell-icon" />
                            <div>
                              <div className="font-medium">{date}</div>
                              <div className="text-sm text-gray">{time}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="admin-cell-student">
                            <div className="student-avatar">{getInitials(reg.name)}</div>
                            <span className="font-medium">{reg.name}</span>
                          </div>
                        </td>
                        <td>{reg.parentName}</td>
                        <td>
                          <span className={`grade-badge ${getGradeColorClass(reg.grade)}`}>
                            {reg.grade}
                          </span>
                        </td>
                        <td>
                          <div className={`subject-badge ${getSubjectColorClass(reg.subjects)}`}>
                            <BookOpen size={12} /> {reg.subjects}
                          </div>
                        </td>
                        <td>
                          <div className="flex-center gap-2">
                            <Phone size={14} className="cell-icon" /> {reg.phone}
                          </div>
                        </td>
                        <td>
                          <div className="flex-center gap-2">
                            <Mail size={14} className="cell-icon" /> {reg.email || '-'}
                          </div>
                        </td>
                        <td>
                          <div className="flex-center gap-2 admin-message-cell" title={reg.message}>
                            <MessageSquare size={14} className="cell-icon" /> {reg.message || 'No message'}
                          </div>
                        </td>
                        <td className="text-center">
                          <button className="action-btn"><MoreVertical size={16} /></button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="admin-pagination">
            <span>Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries</span>
            <div className="pagination-controls">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                &lt;
              </button>
              <button className="active">{currentPage}</button>
              <button 
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
