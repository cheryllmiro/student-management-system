<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Student::orderBy('created_at', 'desc')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'student_id' => 'required|unique:students|max:20',
                'first_name' => 'required|max:50',
                'last_name' => 'required|max:50',
                'email' => 'required|email|unique:students',
                'phone' => 'required|max:20',
                'date_of_birth' => 'required|date',
                'address' => 'required',
                'course' => 'required|max:100',
                'year_level' => 'required|max:10',
                'section' => 'required|max:10',
                'gender' => 'required|in:Male,Female,Other'
            ]);

            $student = Student::create($validated);
            return response()->json(['message' => 'Student created successfully', 'data' => $student], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $student = Student::find($id);
            
            if (!$student) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            
            return response()->json($student);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $student = Student::find($id);
            
            if (!$student) {
                return response()->json(['message' => 'Student not found'], 404);
            }

            $validated = $request->validate([
                'student_id' => [
                    'required',
                    'max:20',
                    Rule::unique('students')->ignore($student->id)
                ],
                'first_name' => 'required|max:50',
                'last_name' => 'required|max:50',
                'email' => [
                    'required',
                    'email',
                    Rule::unique('students')->ignore($student->id)
                ],
                'phone' => 'required|max:20',
                'date_of_birth' => 'required|date',
                'address' => 'required',
                'course' => 'required|max:100',
                'year_level' => 'required|max:10',
                'section' => 'required|max:10',
                'gender' => 'required|in:Male,Female,Other'
            ]);

            $student->update($validated);
            return response()->json(['message' => 'Student updated successfully', 'data' => $student]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    
    public function destroy($id)
    {
        try {
            $student = Student::find($id);
            
            if (!$student) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            
            $student->delete();
            return response()->json(['message' => 'Student deleted successfully']);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all soft deleted students.
     */
    public function deletedStudents()
    {
        try {
            $students = Student::onlyTrashed()->orderBy('deleted_at', 'desc')->get();
            return response()->json($students);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Restore a soft deleted student.
     */
    public function restore($id)
    {
        try {
            $student = Student::withTrashed()->find($id);
            
            if (!$student) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            
            $student->restore();
            return response()->json(['message' => 'Student restored successfully']);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Permanently delete a student.
     */
    public function forceDelete($id)
    {
        try {
            $student = Student::withTrashed()->find($id);
            
            if (!$student) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            
            $student->forceDelete();
            return response()->json(['message' => 'Student permanently deleted']);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}