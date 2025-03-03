document.addEventListener("DOMContentLoaded", () => {
  let musicContainer = document.querySelector(".musicContainer");
  let musicInfo = document.querySelector(".musicInfo");
  let progressContainer = document.querySelector(".progressContainer");
  let progress = document.querySelector(".progress");
  let musicImg = document.querySelector(".musicImg");
  let navigationButtons = document.querySelector(".navigationButtons");
  let icon = document.querySelector(".icon");
  let play = document.querySelector(".play");
  let pauseActive = document.querySelector(".pauseActive");
  let songTitle = document.querySelector(".songTitle");
  let songAudio = document.querySelector(".audio");
  let forward = document.querySelector(".forward");
  let backward = document.querySelector(".backward");

  let allSongs = ["summer", "ukulele", "hey"];
  let songIndex = 0;

  songs(allSongs[songIndex]);
  function songs(song) {
    songTitle.innerHTML = `${song}`;
    musicImg.src = `Images/${song}.jpg`;
    songAudio.src = `Songs/${song}.mp3`;
  }

  function rotatingImg() {
    if (musicImg.style.webkitAnimationPlayState === "running") {
      musicImg.style.webkitAnimationPlayState = "paused";
    } else {
      musicImg.style.webkitAnimationPlayState = "running";
    }
  }

  play.addEventListener("click", () => {
    musicImg.classList.toggle("musicPlaying");
    musicInfo.classList.toggle("playSong");
    pauseActive.classList.toggle("active");
    play.classList.toggle("active");
    songAudio.play();
    // rotatingImg();
  });

  pauseActive.addEventListener("click", () => {
    // musicImg.style.webkitAnimationPlayState = "paused";
    musicImg.classList.remove("musicPlaying");
    musicInfo.classList.remove("playSong");
    pauseActive.classList.remove("active");
    play.classList.remove("active");
    songAudio.pause();
    // rotatingImg();
  });

  backward.addEventListener("click", () => {
    songIndex = (songIndex - 1 + allSongs.length) % allSongs.length;
    console.log(songIndex);
    songs(allSongs[songIndex]);
    musicInfo.classList.add("playSong");
    pauseActive.classList.toggle("active");
    play.classList.toggle("active");
    songAudio.play();
  });

  forward.addEventListener("click", () => {
    if (songIndex <= allSongs.length) {
      songIndex = (songIndex + 1) % allSongs.length;
      console.log(songIndex);
      songs(allSongs[songIndex]);
      musicInfo.classList.add("playSong");
      pauseActive.classList.toggle("active");
      play.classList.toggle("active");
      songAudio.play();
    }
  });


  function updateProgress(e) {
    // console.log(e.srcElement.currentTime)
    // console.log(e.srcElement.duration)

    let {currentTime,duration}=e.srcElement
    let progressPercent=(currentTime/duration)*100
    progress.style.width=`${progressPercent}%`;
  }

  function setProgress(e) {
    let width=this.clientWidth
    let clickX=e.offsetX
    let duration=songAudio.duration
    songAudio.currentTime=(clickX/width)*duration
    // console.log(`width: ${width}`);
    console.log(`clickX: ${clickX}`);
  }

  function nextSong(){
     if (songIndex <= allSongs.length) {
       songIndex = (songIndex + 1) % allSongs.length;
       console.log(songIndex);
       songs(allSongs[songIndex]);
       musicInfo.classList.add("playSong");
       pauseActive.classList.toggle("active");
       play.classList.toggle("active");
       songAudio.play();
     }
  }


songAudio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener('click',setProgress)
songAudio.addEventListener('ended',nextSong)
});
