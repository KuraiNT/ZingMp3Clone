
const PLAYER_STORAGE_KEY = 'F8_PLAYER';

const heading = $('.playing__left-body-name');
const cdThumb = $('.playing__left-avatar');
const author = $('.playing__left-body-author');
const time = $('.playing__center-range-current-time');
const tracktimes = Array.from($$('.tracktime'));
const audio = $('#audio');

const player = $('.playing__bar');
const playBtns = Array.from($$('.btn-toggle-play'));
const progresss = Array.from($$('.progress'));
const progressTrack = $('.progress__track.song--track .progress__track-update');
const playlist = $('.chanel__list');
const listSong = $('.list__song-scroll');

const nextBtns = Array.from($$('.btn-next'));
const prevBtns = Array.from($$('.btn-prev'));
const randomBtns = Array.from($$('.btn-random'));
const repeatBtns = Array.from($$('.btn-repeat'));

const volumnBtn = $('.volumn');
const volumnInput = $('.btn-volumn-duration-update');
const volumnTrack = $('.volumn--track.volumn-active .volumn-update');

const cdThumbMobile = $('.playing__mobile-avatar');
const nameMobile = $('.playing__mobile-name');
const authorMobile = $('.playing__mobile-author');
const playMobileBtn = $('.playing__mobile-btn .play-mobile-icon');
const nextBtnMobile = $('.next-mobile-icon');

const mediaAvatar = $('.mobile__media-img');
const mediaName = $('.mobile__media-header-name');
const mediaAuthor = $('.mobile__media-header-author');
const playMobile = $('.playing__mobile');
const playerMobile = $('.listen__mobile');
const progressTrackMobile = $('.track-mobile.track-control .track-update');
const timeMobile = $('.mobile__control-current-time');

const listenMobile = $('.listen__mobile');
const itemSongMobile = $('.playing__mobile');
const container = $('.container');
const downBtnMobile = $('.mobile__media-header-icon');


const playSlides = Array.from($$('.play-slide'));
const heartIcon = $('.heart-icon');

console.log();

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Pink Venom',
            singer: 'BLACKPINK',
            path: './assets/music/song1.mp3',
            image: './assets/imgsongs/song1.webp',
            time: '03:07'
        },
        {
            name: 'How You Like That',
            singer: 'BLACKPINK',
            path: './assets/music/song2.mp3',
            image: './assets/imgsongs/song2.webp',
            time: '03:01'
        },
        {
            name: 'DUU-DU DUU-Du',
            singer: 'BLACKPINK',
            path: './assets/music/song3.mp3',
            image: './assets/imgsongs/song3.webp',
            time: '03:29'
        },
        {
            name: 'Kill This Love',
            singer: 'BLACKPINK',
            path: './assets/music/song4.mp3',
            image: './assets/imgsongs/song4.webp',
            time: '03:12'
        },
        {
            name: 'See U Later',
            singer: 'BLACKPINK',
            path: './assets/music/song5.mp3',
            image: './assets/imgsongs/song5.webp',
            time: '03:19'
        },
        {
            name: 'Kick It',
            singer: 'BLACKPINK',
            path: './assets/music/song6.mp3',
            image: './assets/imgsongs/song6.webp',
            time: '03:11'
        },
        {
            name: 'BOOMBAYAH',
            singer: 'BLACKPINK',
            path: './assets/music/song7.mp3',
            image: './assets/imgsongs/song1.webp',
            time: '02:53'
        },
        {
            name: 'PLAYING WITH FIRE',
            singer: 'BLACKPINK',
            path: './assets/music/song8.mp3',
            image: './assets/imgsongs/song2.webp',
            time: '03:16'
        },
        {
            name: 'WHISTLE',
            singer: 'BLACKPINK',
            path: './assets/music/song9.mp3',
            image: './assets/imgsongs/song3.webp',
            time: '03:34'
        },
        {
            name: 'Crazy Over You',
            singer: 'BLACKPINK',
            path: './assets/music/song10.mp3',
            image: './assets/imgsongs/song4.webp',
            time: '02:42'
        },
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    // Render UI
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="chanel__item ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}">
                    <div class="chanel__item-top">
                        <img src="${song.image}" alt="" class="chanel__item-top-img">
                        <i class="chanel__item-top-play fa-solid fa-play"></i>
                        <div class="chanel__item-top-body">
                            <p class="chanel__item-top-title">${song.name}</p>
                            <span class="chanel__item-top-author">${song.singer}</span>
                        </div>
                    </div>
                    <div class="chanel__item-center hideOnMobile">
                        <span class="chanel__item-center-text">${song.name}</span>
                    </div>
                    <div class="chanel__item-end">
                        <span class="chanel__item-end-time">${song.time}</span>
                        <ul class="chanel__item-end-list">
                            <li class="chanel__item-end-item">
                                <i class="chanel__item-end-item-icon fa-solid fa-video"></i>
                            </li>
                            <li class="chanel__item-end-item">
                                <i class="chanel__item-end-item-icon fa-solid fa-microphone"></i>
                            </li>
                            <li class="chanel__item-end-item">
                                <i class="chanel__item-end-item-icon fa-solid fa-heart"></i>
                            </li>
                            <li class="chanel__item-end-item">
                                <i class="chanel__item-end-item-icon fa-solid fa-ellipsis"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('');
        listSong.innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        });
    },
    handleEvents: function() {
        const _this = this;
        var lastValueVolume = 1;

        // X??? l?? CD Pc quay / d???ng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity,
        })
        cdThumbAnimate.pause();

        // X??? l?? CD mobile quay / d???ng
        const cdMobileAnimate = cdThumbMobile.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity,
        })
        cdMobileAnimate.pause();

        // X??? l?? media quay / d???ng
        const mediaAnimate = mediaAvatar.animate([
            { transform: 'rotate(360deg)' },
        ], {
            duration: 10000,
            iterations: Infinity,
        })
        mediaAnimate.pause();


        // X??? l?? khi click play PC
        playBtns.forEach((playBtn) => {
            playBtn.onclick = function() {
                if(_this.isPlaying) {
                    audio.pause();
                }else {
                    audio.play();
                }
            }
        })

        // X??? l?? click item song mobile
        itemSongMobile.onclick = function(e) {
            if(e.target.closest('.playing__mobile') || e.target.closest('.playing__mobile-right')) {
        
                    if(e.target.closest('.playing__mobile')) {
                        container.style.display = 'none';
                        listenMobile.style.display = 'block';
                    }   
                    if(e.target.closest('.playing__mobile-right')) {
                        container.style.display = 'block';
                        listenMobile.style.display = 'none';
                    }
                }
            }
        
        // X??? l?? click down btn mobile
        downBtnMobile.onclick = function() {
            container.style.display = 'block';
            listenMobile.style.display = 'none';
        }

        // X??? l?? click next btn mobile song
        nextBtnMobile.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong();
            }else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
            playMobileBtn.classList.replace('fa-play', 'fa-pause');
        }

        // X??? l?? khi click play Mobile
        playMobileBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause();
                playMobileBtn.classList.replace('fa-pause', 'fa-play');
                cdMobileAnimate.pause();
                mediaAnimate.pause();
            }else {
                audio.play();
                playMobileBtn.classList.replace('fa-play', 'fa-pause');
                cdMobileAnimate.play();
                mediaAnimate.play();
            }
        }

        // Khi song ???????c play
        audio.onplay = function() {
            const songActives = Array.from($$('.chanel__item.active'));
            songActives.forEach(songActive => {
                songActive.classList.add('active');
            })
            _this.isPlaying = true;
            player.classList.add('playing');
            playerMobile.classList.add('playing');
            cdThumbAnimate.play();
            mediaAnimate.play();
            playMobileBtn.classList.replace('fa-play', 'fa-pause');
        }

        // Khi song b??? pause
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            playerMobile.classList.remove('playing');
            cdThumbAnimate.pause();
            mediaAnimate.pause();
            playMobileBtn.classList.replace('fa-pause', 'fa-play');
        }

        // Khi ti???n ????? b??i h??t thay ?????i
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.round(audio.currentTime / audio.duration * 100);
                progresss.forEach((progress) => {
                    progress.value = progressPercent;
                })

                progressTrack.style.width = Math.round(audio.currentTime / audio.duration * 100) + '%';
                progressTrackMobile.style.width = Math.round(audio.currentTime / audio.duration * 100) + '%';
            
                tracktimes.forEach((tracktime) => {
                    tracktime.innerHTML = _this.audioCalTime(audio.currentTime);
                })
            }
        }

        // X??? l?? khi tua song PC
        progresss.forEach((progress) => {
            progress.onchange = function(e) {
                const seekTime = audio.duration / 100 * e.target.value;
                audio.currentTime = seekTime;
            }
        })

        //Khi next song
        nextBtns.forEach((nextBtn) => {
            nextBtn.onclick = function() {
                if(_this.isRandom) {
                    _this.playRandomSong();
                } else {
                    _this.nextSong();
                }
                audio.play();
                _this.render();
                _this.scrollToActiveSong();
            }
        })
 
        //Khi prev song
        prevBtns.forEach((prevBtn) => {
            prevBtn.onclick = function() {
                if(_this.isRandom) {
                    _this.playRandomSong();
                } else {
                    _this.prevSong();
                }
                audio.play();
                _this.render();
                _this.scrollToActiveSong();
            }
        })

        // X??? l?? b???t / t???t random song
        randomBtns.forEach((randomBtn) => {
            randomBtn.onclick = function(e) {
                _this.isRandom = !_this.isRandom;
                _this.setConfig('isRandom', _this.isRandom);
                randomBtn.classList.toggle('active', _this.isRandom);
            }
        })

        // X??? l?? l???p l???i 1 song
        repeatBtns.forEach((repeatBtn) => {
            repeatBtn.onclick = function() {
                _this.isRepeat = !_this.isRepeat;
                _this.setConfig('isRepeat', _this.isRepeat);
                repeatBtn.classList.toggle('active', _this.isRepeat);
            }
        })

        // X??? l?? next song khi audio ended
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play();
            }else {
                nextBtns.forEach((nextBtn) => {
                    nextBtn.onclick();
                })
            }
        }

        // L???ng nghe h??nh vi click v??o playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.chanel__item:not(.active)');
            if(songNode || e.target.closest('.chanel__item-end')) {
                // X??? l?? khi click v??o song
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
                
                // X??? l?? khi click v??o chanel end
                if(e.target.closest('.chanel__item-end')) {
                    showErrorToast();
                }
            }
        }

        // L???ng nghe h??nh vi click v??o listSong
        listSong.onclick = function(e) {
            const songNode = e.target.closest('.chanel__item:not(.active)');
            if(songNode || e.target.closest('.chanel__item-end')) {
                // X??? l?? khi click v??o song
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }

                // X??? l?? khi click v??o chanel end
                if(e.target.closest('.chanel__item-end')) {
                    showErrorToast();
                }
            }
        }

        // Thay ?????i ??m l?????ng
        volumnInput.oninput = function() {
            audio.volume = volumnInput.value / 100;
            volumnTrack.style.width = audio.volume * 100 + '%';
            lastValueVolume = audio.volume;

            if(audio.volumn === 0) {
                volumnBtn.classList.toggle('active', true);
                _this.isMute = true;
            }else {
                volumnBtn.classList.toggle('active', false);
                _this.isMute = false;
            }
        }

        // X??? l?? click btn volumn
        volumnBtn.onclick = function() {
            if(_this.isMute) {
                audio.volume = lastValueVolume;
                volumnTrack.style.width = audio.volume * 100 + '%';
            }else {
                audio.volume = 0;
                volumnTrack.style.width = audio.volume * 100 + '%';
            }
            volumnBtn.classList.toggle('active', !_this.isMute);
            _this.isMute = !_this.isMute;
        }

        // X??? l?? khi click btn play slide
        playSlides.forEach((playSlide) => {
            playSlide.onclick = function() {
                audio.play();
            }
        })

        // X??? l?? click heart icon 
        heartIcon.onclick = function() {
            if(heartIcon.classList.contains('active')) {
                heartIcon.classList.remove('active');
            } else {
                heartIcon.classList.add('active');
            }
        }
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.chanel__item.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }, 300);
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.src = `${this.currentSong.image}`;
        author.textContent = this.currentSong.singer;
        time.textContent = this.currentSong.time;
        audio.src = this.currentSong.path;
    },
    loadCurrentSongMobile: function() {
        cdThumbMobile.src = `${this.currentSong.image}`;
        nameMobile.textContent = this.currentSong.name;
        authorMobile.textContent = this.currentSong.singer;
    },
    loadMediaMobile: function() {
        mediaAvatar.src = `${this.currentSong.image}`;
        mediaName.textContent = this.currentSong.name;
        mediaAuthor.textContent = this.currentSong.singer;
        timeMobile.textContent = this.currentSong.time;
    },
    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        this.loadCurrentSongMobile();
        this.loadMediaMobile();
    },
    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
        this.loadCurrentSongMobile();
        this.loadMediaMobile();
    },
    playRandomSong: function() {
        let newIndex;
        do {
            newIndex = Math.round(Math.random() * this.songs.length);
        } while(newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
        this.loadCurrentSongMobile();
        this.loadMediaMobile();
    },
    repeatBtn: function() { 

    },
    audioCalTime: function(time) {
        let minute, second;
        if(time) {
            minute = Math.floor(time / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
            second = Math.floor(time % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        }else {
            minute = (0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
            second = (0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        }
        return `${minute}:${second}`;
    },
     start: function() {
        // G??n c???u h??nh t??? config v??o ???ng d???ng
        this.loadConfig();
        
        // ?????nh ngh??a c??c thu???c t??nh cho Object
        this.defineProperties();

        // X??? l?? c??c s??? ki???n (DOM Events)
        this.handleEvents();

        this.render();

        // T???i th??ng tin b??i h??t ?????u ti??n v??o UI khi ch???y ???ng d???ng
        this.loadCurrentSong();

        // T???i th??ng tin b??i h??t ?????u ti??n v??o UI khi ch???y ???ng d???ng Mobile
        this.loadCurrentSongMobile();

        // T???i th??ng tin media ?????u ti??n v??o UI khi ch???y ???ng d???ng Mobile
        this.loadMediaMobile();

        // Hi???n th??? tr???ng th??i ban ?????u c???a btn repeat v?? random
        randomBtns.forEach((randomBtn) => {
            randomBtn.classList.toggle('active', this.isRandom);
        })
        repeatBtns.forEach((repeatBtn) => {
            repeatBtn.classList.toggle('active', this.isRepeat);
        })
    }
}

app.start();
