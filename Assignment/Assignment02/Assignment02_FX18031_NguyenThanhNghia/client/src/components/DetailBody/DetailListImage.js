import "./DetailListImage.css";

const DetailListImage = (props) => {
  let contentListImage = <p>There is no photo for this Hotel!</p>;
  if (props.data.length > 0) {
    contentListImage = props.data.map((link, index) => {
      return (
        <div key={index} className="img-item">
          <img src={link}></img>
        </div>
      );
    });
  }
  return <div className="detail-list-image">{contentListImage}</div>;
};

export default DetailListImage;
