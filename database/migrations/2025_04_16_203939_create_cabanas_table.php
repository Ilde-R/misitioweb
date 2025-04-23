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
    $table->string('direccion');
    $table->string('ciudad');
    $table->string('estado'); 
    $table->string('pais'); 
    $table->integer('capacidad');
    $table->decimal('precio_noche', 8, 2);
    $table->boolean('disponible')->default(true);
    $table->string('imagen')->nullable();
    $table->text('descripcion')->nullable();
    $table->json('servicios')->nullable();
    $table->string('politicas')->nullable();
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
