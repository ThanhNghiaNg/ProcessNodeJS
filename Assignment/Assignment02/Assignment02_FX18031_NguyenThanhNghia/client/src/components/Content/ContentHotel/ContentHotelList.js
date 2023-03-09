import "./ContentHotelList.css";
import ContentHotelItem from './ContentHotelItem'

const ContentHotelList = (props) => {
    let contentHotelList = <p>Found no data!</p>
    if (props.data.length > 0){
        contentHotelList = (props.data.map(hotel=>{
            return <ContentHotelItem key={hotel.name +'-'+ hotel.city} item={hotel}/>
        }))
    }
  return (
    <div className="content-hotel-list">
      <h3>Homes guests love</h3>
      <div className="hotel-list-items">{contentHotelList}</div>
    </div>
  );
};

export default ContentHotelList;
