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
         Schema::create('reservaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); 
            $table->foreignId('cabana_id')->constrained('cabanas')->onDelete('cascade'); 
            $table->date('fecha_inicio'); 
            $table->date('fecha_fin');
            $table->decimal('total', 10, 2); 
            $table->enum('estado', ['pendiente', 'confirmada', 'cancelada'])->default('pendiente'); 
            $table->string('metodo_pago')->nullable(); 
            $table->text('notas')->nullable();
            $table->integer('numero_personas')->default(1); 
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservaciones');
    }
};
