<template>
  <div>
    <h2 class="mb-4">
      <i :class="isEditMode ? 'fas fa-edit' : 'fas fa-user-plus'"></i>
      {{ isEditMode ? 'Edit Student' : 'Add New Student' }}
    </h2>
    
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    
    <div class="card shadow">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="row">
            <!-- Student ID -->
            <div class="col-md-6 mb-3">
              <label class="form-label">Student ID *</label>
              <input type="text" class="form-control" v-model="form.student_id" required>
            </div>

            <!-- Gender -->
            <div class="col-md-6 mb-3">
              <label class="form-label">Gender *</label>
              <select class="form-control" v-model="form.gender" required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <!-- First Name -->
            <div class="col-md-6 mb-3">
              <label class="form-label">First Name *</label>
              <input type="text" class="form-control" v-model="form.first_name" required>
            </div>

            <!-- Last Name -->
            <div class="col-md-6 mb-3">
              <label class="form-label">Last Name *</label>
              <input type="text" class="form-control" v-model="form.last_name" required>
            </div>

            <!-- Email -->
            <div class="col-md-6 mb-3">
              <label class="form-label">Email *</label>
              <input type="email" class="form-control" v-model="form.email" required>
            </div>

            <!-- Phone -->
            <div class="col-md-6 mb-3">
              <label class="form-label">Phone *</label>
              <input type="text" class="form-control" v-model="form.phone" required>
            </div>

            <!-- Date of Birth -->
            <div class="col-md-6 mb-3">
              <label class="form-label">Date of Birth *</label>
              <input type="date" class="form-control" v-model="form.date_of_birth" required>
            </div>

            <!-- Course -->
            <div class="col-md-6 mb-3">
              <label class="form-label">Course *</label>
              <input type="text" class="form-control" v-model="form.course" required>
            </div>

            <!-- Year Level -->
            <div class="col-md-4 mb-3">
              <label class="form-label">Year Level *</label>
              <select class="form-control" v-model="form.year_level" required>
                <option value="">Select Year</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
              </select>
            </div>

            <!-- Section -->
            <div class="col-md-4 mb-3">
              <label class="form-label">Section *</label>
              <input type="text" class="form-control" v-model="form.section" required>
            </div>

            <!-- Address -->
            <div class="col-12 mb-3">
              <label class="form-label">Address *</label>
              <textarea class="form-control" v-model="form.address" rows="3" required></textarea>
            </div>
          </div>

          <div class="d-flex justify-content-between">
            <router-link to="/" class="btn btn-secondary">
              <i class="fas fa-arrow-left me-1"></i>Back
            </router-link>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm"></span>
              <i v-else class="fas fa-save me-1"></i>
              {{ isEditMode ? 'Update Student' : 'Save Student' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStudentStore } from '../../stores/studentStore';

const route = useRoute();
const router = useRouter();
const studentStore = useStudentStore();

const isEditMode = computed(() => route.name === 'edit');
const loading = ref(false);
const error = ref('');

const form = ref({
  student_id: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  date_of_birth: '',
  address: '',
  course: '',
  year_level: '',
  section: '',
  gender: ''
});

onMounted(async () => {
  if (isEditMode.value) {
    await fetchStudent();
  }
});

const fetchStudent = async () => {
  try {
    const response = await fetch(`/api/students/${route.params.id}`);
    const student = await response.json();
    
    // Format date for input
    if (student.date_of_birth) {
      student.date_of_birth = new Date(student.date_of_birth).toISOString().split('T')[0];
    }
    
    form.value = student;
  } catch (err) {
    error.value = 'Failed to load student data';
    console.error(err);
  }
};

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';

  try {
    let response;
    
    if (isEditMode.value) {
      // Update student
      response = await studentStore.updateStudent(route.params.id, form.value);
    } else {
      // Create student
      response = await studentStore.addStudent(form.value);
    }

    if (response.success) {
      alert(isEditMode.value ? 'Student updated successfully!' : 'Student added successfully!');
      router.push('/');
    } else {
      error.value = response.error || 'Failed to save student';
      if (typeof error.value === 'object') {
        // If it's validation errors object
        const errors = Object.values(error.value).flat();
        error.value = errors.join(', ');
      }
    }
  } catch (err) {
    error.value = 'An error occurred while saving';
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>