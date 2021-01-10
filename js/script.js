const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music obj
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electrict Chill Machine',
        artist: 'Nes',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Nes',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Nes',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Nes',
    },
];

let isPlaying = false; // Check if playing
let songIndex = 0; //Current Song
const nextSong = true;
const prevSong = false;

// Play or Puse Song
const StatusSong = (flag, currentStatus, newStatus) => {
    isPlaying = flag;
    playBtn.classList.replace(`fa-${currentStatus}-circle`, `fa-${newStatus}-circle`);
    playBtn.setAttribute(`title`, `${newStatus}`);
    isPlaying ?  music.play() : music.pause();
}

// Update DOM
const loadSong = (song) => {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `./music/${song.name}.mp3`;
    image.src = `./img/${song.name}.jpg`;
}

// Previous or Next Song
const changeSong = (nextSong) => {
    if (nextSong) {
        songIndex++
        if (songIndex > songs.length - 1)
            songIndex = 0;
    }else {
        songIndex--;
        if (songIndex < 0)
            songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    StatusSong(true, 'play', 'pause');
}

// Update Progress Bar & Time
const updateProgressBar = (e) => {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width 
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutees = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10)
            durationSeconds = `0${durationSeconds}`;
        // Delay switching duration Element to avoid NaN
        if (durationSeconds)
            durationEl.textContent = `${durationMinutees}:${durationSeconds}`;

        // Calculate display for current
        const currentMinutees = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10)
            currentSeconds = `0${currentSeconds}`;
        currentTimeEl.textContent  = `${currentMinutees}:${currentSeconds}`;
    }
}

// Set Progress bar
const setProgressBar = (e)  => {
    const width = e.srcElement.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// On Load - Select First Song
loadSong(songs[songIndex]);

//Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? StatusSong(false, 'pause','play') : StatusSong(true, 'play', 'pause')));// Paly or Pause Event listener
prevBtn.addEventListener('click', () => changeSong(prevSong));
nextBtn.addEventListener('click', () => changeSong(nextSong));
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended',  () => changeSong(nextSong));
progressContainer.addEventListener('click', setProgressBar);