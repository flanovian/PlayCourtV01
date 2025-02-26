const mongoose = require('mongoose');
const Tournament = require('../models/tournamentModel');

mongoose.connect('mongodb://127.0.0.1/linkchampions')
    .then((result) => {
        console.log('connected to mongodb')
    }).catch((err) => {
        console.log(err)
    });

async function seedTournament() {
  const tournaments = [
    {
        name: 'Jakarta Open Tennis Championship',
        category: 'single',
        sportCategory: 'tenis',
        price: 150000,
        location: 'Gelora Bung Karno, Jakarta',
        maxPlayer: 32,
        setPlay: 3,
        startRegister: new Date('2025-03-01'),
        endRegister: new Date('2025-03-15'),
        startMatch: new Date('2025-04-01'),
        endMatch: new Date('2025-04-10'),
        finalDate: new Date('2025-04-12'),
        status: 'open',
        images: 'https://picsum.photos/500/400',
        author: 'John Doe',
        maxLevel: 'elite',
        description: 'Turnamen tenis tingkat nasional dengan hadiah besar.'
    },
    {
        name: 'Bandung Futsal Cup',
        category: 'team',
        sportCategory: 'sepakbola',
        price: 500000,
        location: 'GOR Bandung, Bandung',
        maxPlayer: 10,
        setPlay: 2,
        startRegister: new Date('2025-05-01'),
        endRegister: new Date('2025-05-20'),
        startMatch: new Date('2025-06-01'),
        endMatch: new Date('2025-06-15'),
        finalDate: new Date('2025-06-18'),
        status: 'open',
        images: 'https://picsum.photos/500/400',
        author: 'Jane Smith',
        maxLevel: 'beginner',
        description: 'Turnamen futsal untuk tim pemula dengan sistem gugur.'
    },
    {
        name: 'Surabaya Badminton Tournament',
        category: 'double',
        sportCategory: 'bulutangkis',
        price: 200000,
        location: 'GOR Sudirman, Surabaya',
        maxPlayer: 16,
        setPlay: 3,
        startRegister: new Date('2025-07-01'),
        endRegister: new Date('2025-07-15'),
        startMatch: new Date('2025-08-01'),
        endMatch: new Date('2025-08-08'),
        finalDate: new Date('2025-08-10'),
        status: 'close',
        images: 'https://picsum.photos/500/400',
        author: 'Michael Lee',
        maxLevel: 'newbie',
        description: 'Kompetisi bulutangkis ganda putra/putri tingkat regional.'
    },
    {
        name: 'Yogyakarta Basketball League',
        category: 'team',
        sportCategory: 'basket',
        price: 300000,
        location: 'GOR Among Rogo, Yogyakarta',
        maxPlayer: 12,
        setPlay: 4,
        startRegister: new Date('2025-09-01'),
        endRegister: new Date('2025-09-15'),
        startMatch: new Date('2025-10-01'),
        endMatch: new Date('2025-10-10'),
        finalDate: new Date('2025-10-12'),
        status: 'open',
        images: 'https://picsum.photos/500/400',
        author: 'David Beckham',
        maxLevel: 'elite',
        description: 'Turnamen bola basket antar klub di Yogyakarta.'
    },
    {
        name: 'Medan Chess Championship',
        category: 'single',
        sportCategory: 'catur',
        price: 100000,
        location: 'Plaza Medan Fair, Medan',
        maxPlayer: 20,
        setPlay: 5,
        startRegister: new Date('2025-11-01'),
        endRegister: new Date('2025-11-15'),
        startMatch: new Date('2025-12-01'),
        endMatch: new Date('2025-12-05'),
        finalDate: new Date('2025-12-07'),
        status: 'open',
        images: 'https://picsum.photos/500/400',
        author: 'Garry Kasparov',
        maxLevel: 'newbie',
        description: 'Kompetisi catur dengan sistem Swiss.'
    },
    {
        name: 'Bali Surfing Open',
        category: 'single',
        sportCategory: 'selancar',
        price: 250000,
        location: 'Pantai Kuta, Bali',
        maxPlayer: 25,
        setPlay: 3,
        startRegister: new Date('2025-06-01'),
        endRegister: new Date('2025-06-20'),
        startMatch: new Date('2025-07-05'),
        endMatch: new Date('2025-07-10'),
        finalDate: new Date('2025-07-12'),
        status: 'open',
        images: 'https://picsum.photos/500/400',
        author: 'Kelly Slater',
        maxLevel: 'elite',
        description: 'Turnamen selancar internasional di Bali.'
    },
    {
        name: 'Makassar Marathon',
        category: 'single',
        sportCategory: 'lari',
        price: 75000,
        location: 'Pantai Losari, Makassar',
        maxPlayer: 100,
        setPlay: 1,
        startRegister: new Date('2025-04-01'),
        endRegister: new Date('2025-04-30'),
        startMatch: new Date('2025-05-15'),
        endMatch: new Date('2025-05-15'),
        finalDate: new Date('2025-05-15'),
        status: 'open',
        images: 'https://picsum.photos/500/400',
        author: 'Usain Bolt',
        maxLevel: 'beginner',
        description: 'Lomba marathon sejauh 42 km di Makassar.'
    },
    {
        name: 'Semarang Volleyball Cup',
        category: 'team',
        sportCategory: 'voli',
        price: 180000,
        location: 'GOR Jatidiri, Semarang',
        maxPlayer: 12,
        setPlay: 5,
        startRegister: new Date('2025-07-10'),
        endRegister: new Date('2025-07-25'),
        startMatch: new Date('2025-08-10'),
        endMatch: new Date('2025-08-18'),
        finalDate: new Date('2025-08-20'),
        status: 'close',
        images: 'https://picsum.photos/500/400',
        author: 'Karch Kiraly',
        maxLevel: 'elite',
        description: 'Turnamen bola voli antar klub di Semarang.'
    }
];

module.exports = tournaments;

    try {
        await Tournament.deleteMany({});
        await Tournament.insertMany(tournaments);
        console.log('Data berhasil disimpan');
    } catch (err) {
        console.log('Terjadi kesalahan saat menyimpan data:', err);
    } finally {
        mongoose.disconnect();
    }
}

seedTournament();