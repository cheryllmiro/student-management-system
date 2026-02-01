<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StudentController;

// Test route first
Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'API is working!',
        'timestamp' => now()
    ]);
});

// Students API
Route::prefix('students')->name('students.')->group(function () {
    Route::get('/', [StudentController::class, 'index'])->name('index');
    Route::post('/', [StudentController::class, 'store'])->name('store');
    Route::get('/{id}', [StudentController::class, 'show'])->name('show');
    Route::put('/{id}', [StudentController::class, 'update'])->name('update');
    Route::delete('/{id}', [StudentController::class, 'destroy'])->name('destroy');
    
    // Deleted students
    Route::get('/deleted/list', [StudentController::class, 'deletedStudents'])->name('deleted.list');
    Route::post('/{id}/restore', [StudentController::class, 'restore'])->name('restore');
    Route::delete('/{id}/force-delete', [StudentController::class, 'forceDelete'])->name('force.delete');
});