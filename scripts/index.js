const themeSwitch = document.querySelector('.header-switch');

themeSwitch.addEventListener('click', (e) => {
  themeSwitch.classList.toggle('active');
  document.body.classList.toggle('dark-mode-variables');
});


const inputs = document.querySelectorAll('input');

inputs.forEach((input) => {
   if (input.getAttribute('type') !== 'button') {
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
   }
});


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


const activitiesCardsContainer = document.getElementById('activities-cards');

const createActivityCard = (activity) => {
  const {id, title, description, imgUrl} = activity;
  
  const card = document.createElement('div');
  activitiesCardsContainer.appendChild(card);
  card.classList.add('card');
  card.setAttribute('id', id);
  
  const cardTitle = document.createElement('h4');
  cardTitle.innerHTML = title;
  card.appendChild(cardTitle);
  
  const cardImg = document.createElement('img');
  cardImg.src = imgUrl;
  card.appendChild(cardImg);
  
  const cardDescription = document.createElement('p');
  cardDescription.innerHTML = description;
  card.appendChild(cardDescription);
  
  const cardDelete = document.createElement('ion-icon');
  cardDelete.setAttribute('name', 'trash-outline');
  cardDelete.classList.add('card-delete');
  cardDelete.setAttribute('id', id);
  cardDelete.addEventListener('click', deleteActivityCard);
  card.appendChild(cardDelete)
}


//!“Mapear” el listado de actividades para convertirlos todos en elementos HTML. Para ello utilizar el método “map”, aprovechando como callback la función que hicimos en el punto anterior. Guardar el resultado del mapeo en una nueva variable.
//!“Appendear” todos los elementos HTML del nuevo array dentro del contenedor seleccionado. Para ello puedes utilizar el método forEach.
const innerActivitiesCards = () => {
  activitiesCardsContainer.innerHTML = '';
  const activitiesArray = repo.getAllActivities();
  
  if (activitiesArray.length === 0) {
    activitiesCardsContainer.innerHTML = 'No hay actividades agregadas...';
  } else {
    activitiesArray.map((activity) => {
      createActivityCard(activity)
    })
  }
}


const handleClic = () => {
  const activity = document.getElementById('activity')
  const detail = document.getElementById('detail')
  const imgUrl = document.getElementById('imgUrl')

  const activityValue = activity.value.trim();
  const detailValue = detail.value.trim();
  const imgUrlValue = imgUrl.value.trim();
  
  if (activityValue === '' || detailValue === '' || imgUrlValue === '') {
    alert('Por favor rellene todos los campos');
  } else {
    repo.createActivity(activityValue, detailValue, imgUrlValue);
    activity.value = '';
    detail.value = '';
    imgUrl.value = '';
    inputs.forEach((input) => {
      if (input.getAttribute('type') !== 'button') {
        input.previousElementSibling.classList.remove('top');
        input.parentNode.classList.remove('focus');
      }
    })
    innerActivitiesCards();
    for(let i = 0; i < 50; i++) {
      const spark = document.createElement('i')
      const form = document.getElementById('button')
      
      const x = (Math.random() - 0.5) * window.innerWidth
      const y = (Math.random() - 0.5) * window.innerHeight
      spark.style.setProperty('--x', x + 'px')
      spark.style.setProperty('--y', y + 'px')

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
}

const boton = document.getElementById('boton')
boton.addEventListener('click', handleClic)


const deleteActivityCard = (e) => {
  repo.deleteActivity(Number(e.target.id));
  innerActivitiesCards();
}
