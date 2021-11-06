import {GiTennisRacket} from "react-icons/gi"
import {GiBasketballBasket} from "react-icons/gi"
import {BiFootball} from "react-icons/bi"
import {GiVolleyballBall} from "react-icons/gi"
import {GiFrisbee}from "react-icons/gi"


const icons = {
  idS0:<GiTennisRacket className = "card-img-top" style = {{height:"5em"}}/>,
  idS1:<GiBasketballBasket className = "card-img-top" style = {{height:"5em"}}/>,
  idS2:<BiFootball className = "card-img-top"style = {{height:"5em"}}/>,
  idS3:<GiVolleyballBall className = "card-img-top"style = {{height:"5em"}}/> ,
  idS4:<GiFrisbee className = "card-img-top"style = {{height:"5em"}}/>
}

const SportSelection =({sports,setSport}) => (
  <>
    <h1 className='text-center mb-5' data-cy="sport-select">Choose your sports!</h1>
    <div className='container-sm d-flex flex-wrap justify-content-center' style = {{maxWidth:'800px'}}>
      {
        Object.values(sports).map(sport => (
          <div key={sport.sport_id}
              className="card p-2 m-2 col-lg-5 col-12 rounded" 
              style={{borderWidth:'5px'}}>
            {icons[sport.sport_id]}
            <div className="card-body">
              <a  href="#"
                  onClick={ () => setSport(sport.sport_id)} 
                  className="stretched-link btn btn-primary w-100"
                  data-cy={`sport-select-${sport.sport_id}`}>
                {sport.name} 
              </a>
            </div>
          </div>
        ))
      }
    </div>
  </>
);

export default SportSelection