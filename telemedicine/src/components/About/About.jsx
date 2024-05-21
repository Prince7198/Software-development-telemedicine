import React from 'react';
import "./About.css";

const About = () => {
  return (
    <div>
        <div className="abanner">
        
        </div>
        <h1 className="atitle"> Our Team</h1>
        <div className="card-container">
            <div className="card">
                <div className="card-content">
                    <h3>Dr Annie</h3>
                    <img src="/src/assets/dr-annie.avif" alt="" />                   
                   <h4>Cardiologist</h4>
                    <p>As a cardiologist I treat heart disease, 
                        arrhythmias, and valve problems, 
                        keeping your cardiovascular system in rhythm.</p>
                </div>

            </div>
            <div className="card">
                <div className="card-content">
                    <h3>Dr Smith</h3>
                    <img src="/src/assets/dr-smith.webp" alt="" />                   
                   <h4>Gynecologist</h4>
                    <p>As a gynecologist, I focus on women's health, treating conditions
                         of the reproductive system from menstruation and fertility to 
                         infections and cancer screenings.</p>
                </div>

            </div>
            <div className="card">
                <div className="card-content">
                    <h3>Dr Mary</h3>
                    <img src="/src/assets/dr-mary.webp" alt="" />                   
                   <h4>Pediatrician</h4>
                    <p>As a pediatrician, I care for children from birth to young adulthood, providing checkups,
 immunizations, and treatment for childhood illnesses, ensuring their healthy development.</p>
                </div>

            </div>
            <div className="card">
                <div className="card-content">
                    <h3>Dr Michael</h3>
                    <img src="/src/assets/dr-mike.avif" alt="" />                   
                   <h4>Dermatologist</h4>
                    <p>As a dermatologist, I diagnose and treat skin,
                         hair, and nail conditions like acne, eczema, 
                         and psoriasis, helping you maintain a healthy, 
                         radiant appearance.</p>
                </div>

            </div>
            <div className="card">
                <div className="card-content">
                    <h3>Dr Catherine</h3>
                    <img src="/src/assets/dr-catherine.webp" alt="" />                   
                   <h4>Ophthalmologist</h4>
                    <p>As an ophthalmologist, I specialize in the eyes, 
                        treating cataracts, glaucoma, and other vision problems, 
                        helping you see the world clearly.</p>
                </div>

            </div>
            <div className="card">
                <div className="card-content">
                    <h3>Dr Mathew</h3>
                    <img src="/src/assets/dr-mathew.png" alt="" />                   
                   <h4>Psychiatrist</h4>
                    <p>As a psychiatrist, I address mental health concerns like anxiety, 
                        depression, and schizophrenia, providing therapy and 
                        medication to help manage emotions and improve well-being</p>
                </div>

            </div>

        </div>
    </div>
  )
}

export default About