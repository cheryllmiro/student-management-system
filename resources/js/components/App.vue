<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <i class="fas fa-graduation-cap me-2"></i>
          Student Management System
        </router-link>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                <i class="fas fa-list me-1"></i> Students List
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/students/create">
                <i class="fas fa-user-plus me-1"></i> Add Student
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/students/deleted">
                <i class="fas fa-trash me-1"></i> Deleted Students
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="py-4">
      <div class="container">
        <router-view></router-view>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-light py-3 mt-5 border-top">
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
  }
}
</script>

<style>

.nav-link {
  cursor: pointer !important;
}

.nav-link:hover {
  opacity: 0.8;
}


#app * {
  pointer-events: auto !important;
}

.btn-action {
  margin-right: 5px;
  min-width: 40px;
}

.nav-link.router-link-active {
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}

.table th {
  background-color: #f8f9fa;
  border-top: none;
}
</style>