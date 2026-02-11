import {useNavigate} from "react-router-dom"
import "../PackageDetails.scss"

const PackageCTA = ({ pkg }) => {
  const navigate= useNavigate();

  return (
    <div className="cta-card">
      <h3>₹{pkg.price}</h3>
      <p>Per Person</p>
      <p>{pkg.days} Days / {pkg.nights} Nights</p>

      <button onClick={()=>navigate(`/booking/${pkg._id}`)} className="book-now">Book Now</button>

      <a className="whatsapp" href={`https://wa.me/91XXXXXXXXXX?text=Interested in ${pkg.title}`}
      target="_blank"
      rel="noreferrer"
      >
        💬 WhatsApp Enquiry
      </a>
      <small>No hidden charges</small>
    </div>
  );
};

export default PackageCTA;
