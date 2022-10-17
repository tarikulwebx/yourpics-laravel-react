<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('picture_tag')) {
            Schema::create('picture_tag', function (Blueprint $table) {
                $table->id();
                $table->foreignId('tag_id')->constrained()->on('tags')->onDelete('cascade');
                $table->foreignId('picture_id')->constrained()->on('pictures')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('picture_tag');
    }
};
