import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
 

 useEffect(() => {
  console.log("Recipe ID from URL:", id); 
  axios.get(`http://localhost:5000/api/recipes/${id}`)
    .then(response => {
      console.log("Fetched Recipe:", response.data); 
      setRecipe(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching recipe:", error.response || error);
      setRecipe(null);
      setLoading(false);
    });
}, [id]);


  if (loading) return <h2 style={styles.title}>Loading Recipe...</h2>;
  if (!recipe) return <h2 style={styles.title}>Recipe Not Found</h2>;




  //  Function to Download Recipe as PDF
  const downloadPDF = async () => {
    const input = document.getElementById("recipe-card"); 
    html2canvas(input, { useCORS: true }) 
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png"); 
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save("recipe.pdf");
      })
      .catch((error) => console.error("Error generating PDF:", error));
  };

  return (
    <div id="recipe-card" style={styles.container}>
      <h2 style={styles.title}>{recipe.title}</h2>
     
      {recipe.image && <img src={`http://localhost:5000${recipe.image}`} alt={recipe.title} style={styles.image} />}
      <p style={styles.description}><strong>Description:</strong> {recipe.description}</p>
      <h3 style={styles.details}>Ingredients</h3>
      <ul style={styles.details}>
        {recipe.ingredients.map((ing, index) => <li key={index}>{ing}</li>)}
      </ul>
      <h3 style={styles.details}>Instructions</h3>
      <p style={styles.details}>{recipe.instructions}</p>
      <button onClick={downloadPDF} style={styles.pdfButton}>Download as PDF</button>
    </div>
  );
};


const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    textAlign: "center",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "24px",
    color: "#333",
  },
  image: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  description: {
    fontSize: "16px",
    color: "#666",
  },
  details: {
    fontSize: "14px",
    color: "#888",
  },
  pdfButton: {
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#e91e63",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default RecipeDetails;
