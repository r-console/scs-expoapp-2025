const htmlContent = (simage, cimage, machineHtmlData, Bill) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>invoice</title>
        <style>
            *{
                font-family: Arial;
            
            }
            table {
      border-collapse: collapse;
      
      margin-top: 3%;
      
         }
      
         .label {
      color: white;
      padding: 18px;
      font-family: Arial;
    }
    .other {background-color: #e7e7e7; color: black;} /* Gray */ 
    #invoice p{display: inline-block;}
    
    .footer {
       position:absolute;
       margin-left: 5%;
       
       width: 90%;
       
       text-align: center;
    }
    
    
        </style>
    </head>
    <body>
        <div style="margin-top: 5%;width: 100%;">
        <span class="label other" style="margin-left: 80%;font-weight: bold;">SERVICE REPORT</span>
    
        <table style="margin-left: 5%;width: 90%;">
        <tr>
        <td>
            <div style="display: flex;">
                <img src="${PDFImages.logo}" height="100px" width="100px">
                <img src="${Bill.name_image}" height="100px" width="600px">
            </div>
        </td>
        <td style="text-align: right;font-weight: bold;">Phone: (+91-0452) 4355745<br/><br/>Phone: (+91-0452) 4355785<br/><br/>${Bill.gst}</td>
            
        </tr>
        <tr >
            <td colspan="2" style="font-weight: bold;width: 500px; " ><span>Plot No. 59, Sakthi Velammal First Main Road, Avenue Street, Bye-Pass Road, S.S.Colony, Madurai - 625 016. Tamil Nadu. India.</span></td>
        </tr>
    </table>
        <hr size="4" width="90%" color="#660000">  
       
        <table style="margin-left: 5%;width: 90%;">
            <tr>
        <td  style="width:500px;font-weight: bold;">BILL TO</td>
       
        <td style="text-align: right;width: 500px;font-weight: bold;">${Bill.bill_date}</td>
            </tr>
            <tr>
                <td style="width:500px;">
                    <p style="font-weight: bold;">${Bill.customer_name}</p>
                    <p>${Bill.customer_address}</p>
                    <p>${Bill.customer_phoneno}</p>
                </td>
                <td style="text-align: right;width: 500px;">
                    <div id="invoice" >
                        <p style="font-weight: bold;">INVOICE ID : &nbsp; </p><p> ${Bill.invoice_id}</p>
                        </div>
                </td>
            </tr>
        </table>
        <div style="margin-left:5%;padding-top:5px;width: 90%;background-color:#D7DBDD;height: 25px;text-align: center;"></div>
    
        <table style="margin-left: 5%;">
            <tr>
     <td style="width: 200px;"><p style="font-weight: bold;">Nature of job </p></td>
     <td>: ${Bill.nature_of_job}</td>
            </tr>
            <tr>
            <td style="width: 200px;"><p style="font-weight: bold;">Rectification Details </p></td>
            <td>: ${Bill.rectification_details}</td>
            </tr>
            ${machineHtmlData}
        </table>
        <hr size="30" width="90%" color="#D7DBDD">  
        <div style="width: 500px;margin-top:2% ;margin-left: 5%;">
        <table>
        <tr>
            <td style="width: 500px;"><p style="font-weight: bold;">Certify that the machine is in Satisfactory working Condition :</p></td>
            <td><p>${Bill.working_condition}</p></td>
            
        </tr>
    </table>
    </div>
    <div style="margin-top:0px;width: 550px;height:300px;float:right;margin-right: 5%;">
    <table style="margin-left:25%;width: 400px;text-align: left;">
        <tr>
            <td><p style="font-weight: bold;">Time in  </p></td>
            <td><p>: ${Bill.in_time}</p></td>
        </tr>
        <tr>
            <td><p style="font-weight: bold;">Time out  </p></td>
            <td><p>: ${Bill.out_time}</p></td>
        </tr>
        <tr>
            <td><p style="font-weight: bold;">Payment Method</p></td>
            <td><p>: ${Bill.payment_method}</p></td>
        </tr>
        <tr>
            <td><p style="font-weight: bold;">Service charges  </p></td>
            <td><p>: ${Bill.s_charge}</p></td>
        </tr>
        <tr>
            <td><p style="font-weight: bold;">Service Engineer Signature </p></td>
            <td>(${Bill.employee_name})</td>
        </tr>
        <tr>
            <td colspan="2"><img src="${simage}" width="300px" height="90px"></td>
        </tr>
    </table>
    </div>
        <div style="margin-top:5%;margin-left:5%;padding-top:5px;width: 40%;background-color:#D7DBDD;height: 25px;text-align: center;">Remarks</div>
        <div style="margin-left:5%;padding-top:15px;width: 40%;background-color:#ede4e4;height: 100px;text-align: center;">${Bill.remarks}</div>
    <table style="margin-left: 5%;width: 300px;">
        <tr><td>
            <p style="font-weight: bold;">Signature of customer (${Bill.signed_by})</p>
        </td>
        </tr>
        <tr>
            <td colspan="2"><img src="${cimage}" width="300px" height="90px"></td>
        </tr>
    </table>
        </div>
        <hr size="4" width="90%" color="#660000">  
    
        <div class="footer">
            <table style="text-align: left;width: 1500px;" >
                <tr>
                    <td rowspan="4" style="text-align:center"><b>Scan to Pay</b><br/><img src="${PDFImages.gpay}" style="height: 70px;width:70px;"></td>
                    <td style="padding-bottom: 10px;">B.O.1 : 26B, Nethaji Road, (Near Eagle Masala) Madurai - 625 001. Tamil Nadu. India.</td>
                </tr>
                <tr>
                    <td colspan="2" style="padding-bottom: 10px;">B.O.2 : No. 1/71D1, Main Road, Kamaraj Nagar Bus Stop, Oppo. to EB office, Dhalavaipuram, Rajapalayam Taluk, 626 188. Tamil Nadu. India.</td>
                </tr>
                <tr>
                    <td colspan="2" style="padding-bottom: 10px;">B.O.3 : Plot No:990, 'H' Block, 2nd Street, 11th Main Road, Anna nagar, Chennai-600 040.Tamilnadu, India.</td>
                </tr>
            
                <tr>
                    <td colspan="2" style="padding-bottom: 10px;">B.O.4:  Maligaikal Building, Sundaragiri 1st Karippai Road, Kalamaserry, Cochin-683 104, Kerala, India</td>
                </tr>
            </table>
          </div>
    </body>
    </html>`
}
