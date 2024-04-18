const themeSwitch = document.querySelector('.header-switch');

themeSwitch.addEventListener('click', (e) => {
  themeSwitch.classList.toggle('active');
  document.body.classList.toggle('dark-mode-variables');
});


const inputs = document.querySelectorAll('input');

inputs.forEach((input) => {
  input.onfocus = () => {
    input.previousElementSibling.classList.add('top', 'focus');
    input.parentNode.classList.add('focus');
  };
  input.onblur = () => {
    input.value = input.value.trim();
    if (input.value.trim().length === 0) {
      input.previousElementSibling.classList.remove('top');
    }
    input.previousElementSibling.classList.remove('focus');
    input.parentNode.classList.remove('focus');
  };
});


const button = document.getElementById('button')

button.addEventListener('click', () => {
  if (activity.value.trim() !== '' && detail.value.trim() !== '' && imgUrl.value.trim() !== '') {
    for(let i = 0; i < 50; i++) {
      const spark = document.createElement('i')
      const form = document.getElementById('button')
      
      // random position
      const x = (Math.random() - 0.5) * window.innerWidth
      const y = (Math.random() - 0.5) * window.innerHeight
      spark.style.setProperty('--x', x + 'px')
      spark.style.setProperty('--y', y + 'px')

      // random size
      const randomSize = Math.random() * 8 + 2;
      spark.style.width = randomSize + 'px';
      spark.style.height = randomSize + 'px';

      form.append(spark)
      spark.classList.add('spark')


      setTimeout(() => {
        spark.remove()
      }, 2000);
    }
  }
})

class Activity {
  constructor(id, title, description, imgUrl) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
  }
}

class Repository {
  constructor() {
    this.activities = [];
    this.id = 0;
  }

  getAllActivities() {
    return this.activities;
  }

  createActivity(title, description, imgUrl) {
    const id = this.id++;
    const newActivity = new Activity(id, title, description, imgUrl);
    this.activities.push(newActivity);
  }

  deleteActivity(id) {
    this.activities = this.activities.filter((activity) => {
      return activity.id !== id;
    })
  }
}


const repo = new Repository();

const handler = () => {
  const activity = document.getElementById('activity')
  const detail = document.getElementById('detail')
  const imgUrl = document.getElementById('imgUrl')
  
  if (activity.value.trim() === '' || detail.value.trim() === '' || imgUrl.value.trim() === '') {
    alert('Por favor rellene todos los campos');
  } else {
    repo.createActivity(activity.value, detail.value, imgUrl.value);
    activity.value = '';
    detail.value = '';
    imgUrl.value = '';
    console.log(repo);
  }
}

const boton = document.getElementById('boton')
boton.addEventListener('click', handler)

