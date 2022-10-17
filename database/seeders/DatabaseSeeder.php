<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call([
            UserTableSeeder::class,
            TagSeeder::class,
        ]);

        // \App\Models\User::factory(10)->create();

        // User::factory()->create([
        //     'first_name' => 'Tarikul',
        //     'last_name' => 'Islam',
        //     'email' => 'tarikul@test.com',
        // ]);
    }
}
