import { defineStore } from 'pinia';
import axios from 'axios';

export const useStudentStore = defineStore('student', {
    state: () => ({
        students: [],
        deletedStudents: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchStudents() {
            this.loading = true;
            this.error = null;
            try {
                console.log('Fetching students from API...');
                const response = await axios.get('/api/students');
                console.log('Students fetched:', response.data);
                this.students = response.data;
                return { success: true, data: response.data };
            } catch (error) {
                this.error = error.response?.data?.message || error.message;
                console.error('Error fetching students:', error);
                return { 
                    success: false, 
                    error: this.error,
                    details: error.response?.data
                };
            } finally {
                this.loading = false;
            }
        },

        async fetchDeletedStudents() {
            this.error = null;
            try {
                console.log('Fetching deleted students...');
                const response = await axios.get('/api/students/deleted/list');
                console.log('Deleted students fetched:', response.data);
                this.deletedStudents = response.data;
                return { success: true, data: response.data };
            } catch (error) {
                this.error = error.response?.data?.message || error.message;
                console.error('Error fetching deleted students:', error);
                return { 
                    success: false, 
                    error: this.error,
                    details: error.response?.data
                };
            }
        },

        async addStudent(studentData) {
            this.error = null;
            try {
                const response = await axios.post('/api/students', studentData);
                this.students.unshift(response.data.data);
                return { success: true, data: response.data.data };
            } catch (error) {
                this.error = error.response?.data?.errors || error.response?.data?.message || error.message;
                console.error('Error adding student:', error);
                return { 
                    success: false, 
                    error: this.error
                };
            }
        },

        async updateStudent(id, studentData) {
            this.error = null;
            try {
                const response = await axios.put(`/api/students/${id}`, studentData);
                const index = this.students.findIndex(s => s.id == id);
                if (index !== -1) {
                    this.students[index] = response.data.data;
                }
                return { success: true, data: response.data.data };
            } catch (error) {
                this.error = error.response?.data?.errors || error.response?.data?.message || error.message;
                console.error('Error updating student:', error);
                return { 
                    success: false, 
                    error: this.error
                };
            }
        },

        async deleteStudent(id) {
            this.error = null;
            try {
                await axios.delete(`/api/students/${id}`);
                this.students = this.students.filter(s => s.id != id);
                return { success: true };
            } catch (error) {
                this.error = error.response?.data?.message || error.message;
                console.error('Error deleting student:', error);
                return { success: false, error: this.error };
            }
        },

        async restoreStudent(id) {
            this.error = null;
            try {
                await axios.post(`/api/students/${id}/restore`);
                this.deletedStudents = this.deletedStudents.filter(s => s.id != id);
                await this.fetchStudents(); 
                return { success: true };
            } catch (error) {
                this.error = error.response?.data?.message || error.message;
                console.error('Error restoring student:', error);
                return { success: false, error: this.error };
            }
        },

        async forceDeleteStudent(id) {
            this.error = null;
            try {
                await axios.delete(`/api/students/${id}/force-delete`);
                this.deletedStudents = this.deletedStudents.filter(s => s.id != id);
                return { success: true };
            } catch (error) {
                this.error = error.response?.data?.message || error.message;
                console.error('Error permanently deleting student:', error);
                return { success: false, error: this.error };
            }
        }
    },

    getters: {
        getStudentById: (state) => (id) => {
            return state.students.find(student => student.id == id);
        },
        getError: (state) => state.error,
        isLoading: (state) => state.loading
    }
});