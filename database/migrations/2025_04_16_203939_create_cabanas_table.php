<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cabanas', function (Blueprint $table) {
    $table->id();
    $table->string('nombre');
    $table->string('ubicacion'); // En vez de descripción
    $table->integer('capacidad');
    $table->decimal('precio_noche', 8, 2);
    $table->boolean('disponible')->default(true);
    $table->string('imagen')->nullable(); // ← Aquí va la imagen
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cabanas');
    }
};
