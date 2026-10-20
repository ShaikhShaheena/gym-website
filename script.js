// Mobile menu open/close
const navLinks = document.getElementById('navLinks');
document.getElementById('menuBtn').addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Monthly / Yearly price switch
document.getElementById('priceToggle').addEventListener('change', (e) => {
  const yearly = e.target.checked;
  document.querySelectorAll('.price').forEach(p => {
    p.textContent = 'AED ' + (yearly ? p.dataset.yearly : p.dataset.monthly);
  });
  document.querySelectorAll('.period').forEach(s => {
    s.textContent = yearly ? '/year' : '/month';
  });
});

//BMI calculator
document.getElementById('bmiBtn').addEventListener('click', () => {
  const height = Number(document.getElementById('height').value) / 100;
  const weight = Number(document.getElementById('weight').value);
  const result = document.getElementById('bmiResult');

  if (!height || !weight) {
    result.textContent = 'please enter height and weight.';
    return;
  }

  const bmi = weight / (height * height);
  let status = 'Obese';
  if (bmi < 18.5 ) status = 'Underweight';
  else if (bmi < 25) status = 'Normal';
  else if (bmi < 30) status = 'Overweight';

  result.textContent= `Your BMI is ${bmi.toFixed(1)} (${status})`;
});

//Highlight today's row in the schedule
const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
const todayRow = document.querySelector(`tr[data-day="${today}"]`);
if (todayRow) todayRow.classList.add('today');

//Contact form thank-you message
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('formMsg').textContent = 'Thanks! We will contact you soon.';
  e.target.reset();
});

//Custom cursor follows mouse, grows on links/buttons/cards
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .card').forEach(el => {
     el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
});

// Spotlight glow inside cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--x', e.clientX - r.left + 'px');
    card.style.setProperty('--y', e.clientY - r.top + 'px');
  });
  card.addEventListener('mouseleave', () => {
    card.style.removeProperty('--x');
    card.style.removeProperty('--y');
  });
});

// 3D tilt on pricing cards
document.querySelectorAll('.plan').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) scale(1.05)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});