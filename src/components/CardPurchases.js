

const CardPurchases = ({datePurchase}) => {
      
    
    const date ={};
    
    for (let i = 0; i < datePurchase.length; i++) {
        if (datePurchase[i] === '-') {
            date.year = datePurchase.slice(0,i);
            date.month = datePurchase.slice(i+1,i+3);
            date.day = datePurchase.slice(i+4,i+6);

            switch (date.month) {
            case '01':
                date.month ='January'
                break;
            case '02':
                date.month ='February'
                break;
            case '03':
                date.month ='March'
                break;
            case '04':
                date.month ='April'
                break;
            case '05':
                date.month ='May'
                break;
            case '06':
                date.month ='June'
                 break;
            case '07':
                date.month ='July'
                 break;
            case '08':
                date.month ='August'
                 break;
            case '09':
                date.month ='September'
                 break;
            case '10':
                date.month ='October'
                 break;
            case '11':
                date.month ='November'
                 break;
            case '12':
                date.month ='December'
                 break;
            default:
                break;
        }
            
        
            i = datePurchase.length
          
        }
        
        
    }
   
   
    
    return (
        <div>
           <h5>{date.month} {date.day}, {date.year}</h5>
        </div>
    );
};

export default CardPurchases;