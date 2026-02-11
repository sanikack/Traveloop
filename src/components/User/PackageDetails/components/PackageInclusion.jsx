
import "../PackageDetails.scss"

const PackageInclusions = ({ pkg }) => {
  return (
    <div className="inclusions">
      <div>
        <h3>Inclusions</h3>
        <ul>
          {pkg.inclusion?.filter(item=> item && item.trim() !== "").map((item, i) => (
            <li key={i}>
              <span className="tick">✔</span>
              {item}
               </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Exclusions</h3>
        <ul>
          {pkg.exclusion?.filter(item=> item && item.trim() !=="").map((item, i) => (
            <li key={i}>✖ {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PackageInclusions;
