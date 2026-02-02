<template>
  <div id="app">
    <!-- Fixed Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow-lg">
      <div class="container">
        <router-link class="navbar-brand fw-bold" to="/">
          <i class="fas fa-graduation-cap me-2"></i>
          Student Management System
        </router-link>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/" exact-active-class="active">
                <i class="fas fa-list me-1"></i> Students List
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/students/create" active-class="active">
                <i class="fas fa-user-plus me-1"></i> Add Student
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/students/deleted" active-class="active">
                <i class="fas fa-trash me-1"></i> Deleted Students
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <router-view></router-view>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-light py-3 border-top">
      <div class="container text-center text-muted">
        <small>Student Management System &copy; {{ new Date().getFullYear() }}</small>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    console.log('App component mounted');
    
    // Add padding to body to prevent content hiding under fixed navbar
    document.body.style.paddingTop = '76px';
    
    // Optional: Update padding on window resize
    window.addEventListener('resize', this.updateBodyPadding);
  },
  
  beforeUnmount() {
    window.removeEventListener('resize', this.updateBodyPadding);
  },
  
  methods: {
    updateBodyPadding() {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 76;
      document.body.style.paddingTop = navbarHeight + 'px';
    }
  }
}
</script>

<style scoped>

.navbar.fixed-top {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  z-index: 1030 !important;
}


.main-content {
  padding-top: 20px;
  min-height: calc(100vh - 120px);
}


.nav-link.active {
  background-color: rgba(255, 255, 255, 0.15) !important;
  border-radius: 5px !important;
  font-weight: 500 !important;
}


.nav-link {
  cursor: pointer !important;
  transition: all 0.3s ease !important;
}

.nav-link:hover {
  opacity: 0.8 !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-radius: 5px !important;
}


@media (max-width: 768px) {
  .main-content {
    padding-top: 15px;
  }
  
  .navbar {
    padding: 0.5rem 0 !important;
  }
  
  .navbar-collapse {
    background-color: #0d6efd;
    padding: 1rem;
    border-radius: 0 0 8px 8px;
    margin-top: 8px;
  }
}

/* Footer styling */
footer {
  position: relative;
  z-index: 1;
}
</style>

<style>

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}


.btn-action {
  margin-right: 5px;
  min-width: 40px;
}


.table th {
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
}


.badge.bg-pink {
  background-color: #e83e8c !important;
  color: white !important;
}


.container {
  position: relative;
}

.spinner-border {
  vertical-align: middle;
}


.form-control:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.card {
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
}
</style>