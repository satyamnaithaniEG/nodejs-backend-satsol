module.exports = (arr) => {
	const today = new Date();

	var subTotal0 = arr[0] === '' ? 0 :parseFloat(arr[0].sellingRate)* parseFloat(arr[0].checkout);
	var gstAmt0 = arr[0] === '' ? 0 :(parseFloat(arr[0].gst)/100)*subTotal0;
	var subTotal1 = arr[1] === '' ? 0 :parseFloat(arr[1].sellingRate)* parseFloat(arr[1].checkout);
	var gstAmt1 = arr[1] === '' ? 0 :(parseFloat(arr[1].gst)/100)*subTotal1;
	var subTotal2 = arr[2] === '' ? 0 :parseFloat(arr[2].sellingRate)* parseFloat(arr[2].checkout);
	var gstAmt2 = arr[2] === '' ? 0 :(parseFloat(arr[2].gst)/100)*subTotal2;
	var subTotal3 =arr[3] === '' ? 0 : parseFloat(arr[3].sellingRate)* parseFloat(arr[3].checkout);
	var gstAmt3 = arr[3] === '' ? 0 :(parseFloat(arr[3].gst)/100)*subTotal3;
 
 return `
 <!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Invoice</title>
</head>
<body>
	<style type="text/css">
	@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,) 400i, 600, 600i, 700;a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,sup,table,tbody,td,tfoot,th,thead,time,total,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}body{height:840px;width:650px;margin:auto;font-family:'Open Sans',sans-serif;font-size:12px}strong{font-weight:700}#container{position:relative;padding:.5%}#header{height:120px}#header>#reference{float:right;text-align:right}#header>#reference h3{margin:0}#header>#reference h4{margin:0;font-size:85%;font-weight:600}#header>#reference p{margin:0;margin-top:2%;font-size:85%}#header>#logo{width:50%;float:left}#fromto{height:120px}#fromto>#from,#fromto>#to{width:45%;min-height:90px;margin-top:10px;font-size:85%;padding:1.5%;line-height:120%}#fromto>#from{float:left;width:45%;background:#efefef;margin-top:10px;font-size:85%;padding:1.5%}#fromto>#to{float:right;border:solid grey 1px}#items{margin-top:10px}#items>p{font-weight:700;text-align:right;margin-bottom:1%;font-size:65%}#items>table{width:100%;font-size:85%;border:solid grey 1px}#items>table th:first-child{text-align:left}#items>table th{font-weight:400;padding:1px 4px}#items>table td{padding:1px 4px}#items>table th:nth-child(3){width:250px}#items>table tr td:not(:first-child){text-align:center;padding-right:1%}#items table td{border-right:solid grey 1px}#items table tr td{padding-top:3px;padding-bottom:3px;height:10px}#items table tr:nth-child(1){border:solid grey 1px}#items table tr th{border-right:solid grey 1px;padding:3px}#items table tr:nth-child(2)>td{padding-top:8px}#summary{height:170px;margin-top:30px}#summary #note{float:left;width:350px}#summary #note h4{font-size:10px;font-weight:600;font-style:italic;margin-bottom:4px}#summary #note p{font-size:10px;font-style:italic}#summary #total table{font-size:85%;width:260px;float:right}#summary #total table td{padding:3px 4px}#summary #total table tr td:last-child{text-align:right}#summary #total table tr:nth-child(6){background:#efefef;font-weight:600}#footer{margin:auto;position:absolute;left:4%;bottom:4%;right:4%;border-top:solid grey 1px}#footer p{margin-top:1%;font-size:65%;line-height:140%;text-align:center}</style>
<div id="container" style="margin-top: 10px;">
	<div id="header">
		<div id="logo">
		<strong>SATVIK SOLUTIONS</strong></br><br>
					<div style="font-size: 10px;">
			Godarwaripuram, Lower Nathanpur,<br>
			Dehradun -248001<br>
			UTTARAKHAND<br>
			email: satsolindia@gmail.com, Mbl: +919415006121/ +918787050389<br>
			GSTIN : 058CBPN1106J1Z2 , DL# UA-DEH-106185/106186 WEF:06.03.2019
		</div>
		</div>
		<div id="reference">
			<h3><strong>GST INVOICE</strong></h3>
			<h4>Invoice No.: ${arr[11]}</h4>
			<p>Date :  ${arr[20]}</p>
			<p>Challan Date :  ${arr[12]}</p>
			<p>Challan Number :  ${arr[21]}</p>
			<p>Order Number :  ${arr[14]}</p>
		</div>
	</div>
	<div id="fromto">
		<div id="from">
			<p>
				Consignee: <br>
				<strong>${arr[10].name}</strong><br>
				${arr[10].address}<br>
				${arr[10].city}-${arr[10].zip} <br>
				${arr[10].state} <br><br>
				GSTIN: ${arr[10].gst} <br>
			</p>
		</div>
		<div id="to">
			<p>
				<strong>Dispatch Through</strong><br>
				${arr[15]}<br>
				<strong>Destination</strong><br>
				${arr[16]}
			</p>
			<div id="pmnt">
			    <strong>Mode/Terms of Payment</strong><br>
				${arr[13]}
			</div>
			<div id="pmnt">
			    <strong>Mode/Terms of Delivery</strong><br>
				${arr[17]}
			</div>
		</div>
	</div>
	<div id="items">
		<!-- <p>Montants exprimés en Euros</p> -->
		<table>
			<tr>
				<th>SL</th>
				<th>Item Code</th>
				<th>Description of Goods</th>
				<th>HSN</th>
				<th>QTY</th>
				<th>UOM</th>
				<th>RATE INR</th>
				<th>SUB TOTAL</th>
				<th>GST%</th>
				<th>GST VALUE</th>
				<th>Amount INR</th>
			</tr>
			<tr>
				<td>1</td>
				<td>${arr[0].itemCode}</td>
				<td style="text-align: left">
					<strong>${arr[0].item}</strong><br>
					<div style="font-size: 8px">
				    Batch: ${arr[0].lotNo}<br>
					Expiry: ${arr[0].exp=== null?'':arr[0].exp.split('T')[0].split('-')[2] + '-' + arr[0].exp.split('T')[0].split('-')[1] + '-' + arr[0].exp.split('T')[0].split('-')[0]}
					</div>
				</td>
				<td>${arr[0].hsn}</td>
				<td>${arr[0].checkout}</td>
				<td>${arr[0].uom}</td>
				<td>${parseFloat(arr[0].sellingRate)}</td>
				<td>${subTotal0}</td>
				<td>${arr[0].gst}</td>
				<td>${gstAmt0}</td>
				<td>${(parseFloat(arr[0].gst)/100)*(parseFloat(arr[0].sellingRate)* parseFloat(arr[0].checkout))+ parseFloat(arr[0].sellingRate)* parseFloat(arr[0].checkout)}</td>
			</tr>
		<tr>
			<td>${arr[1] === '' ? '' : 2}</td>
			<td>${arr[1] === '' ? '' :arr[1].itemCode}</td>
			<td style="text-align: left">
				<strong>${arr[1] === '' ? '' :arr[1].item}</strong><br>
				<div style="font-size: 8px">
				${arr[1] === '' ? '' :'Batch:' + arr[1].lotNo}<br>
				${arr[1].exp === null||arr[1].exp === undefined ? '' :'Expiry:' + arr[1].exp.split('T')[0].split('-')[2] + '-' + arr[1].exp.split('T')[0].split('-')[1] + '-' + arr[1].exp.split('T')[0].split('-')[0]}
				</div>
			</td>
			<td>${arr[1] === '' ? '' :arr[1].hsn}</td>
			<td>${arr[1] === '' ? '' :arr[1].checkout}</td>
			<td>${arr[1] === '' ? '' :arr[1].uom}</td>
			<td>${arr[1] === '' ? '' :parseFloat(arr[1].sellingRate)}</td>
			<td>${arr[1] === '' ? '' :subTotal1}</td>
			<td>${arr[1] === '' ? '' :arr[1].gst}</td>
			<td>${arr[1] === '' ? '' :gstAmt1}</td>
			<td>${arr[1] === '' ? '' :gstAmt1 + subTotal1}</td>
		</tr>
		<tr>
			<td>${arr[2] === '' ? '' : 3}</td>
			<td>${arr[2] === '' ? '' :arr[2].itemCode}</td>
			<td style="text-align: left">
				<strong>${arr[2] === '' ? '' :arr[2].item}</strong><br>
				<div style="font-size: 8px">
				${arr[2] === '' ? '' :'Batch:' + arr[2].lotNo}<br>
				${arr[2].exp === undefined || arr[2].exp === undefined ? '' :'Expiry:' + arr[2].exp.split('T')[0].split('-')[2] + '-' + arr[2].exp.split('T')[0].split('-')[1] + '-' + arr[2].exp.split('T')[0].split('-')[0]}
				</div>
			</td>
			<td>${arr[2] === '' ? '' :arr[2].hsn}</td>
			<td>${arr[2] === '' ? '' :arr[2].checkout}</td>
			<td>${arr[2] === '' ? '' :arr[2].uom}</td>
			<td>${arr[2] === '' ? '' :parseFloat(arr[2].sellingRate)}</td>
			<td>${arr[2] === '' ? '' :subTotal2}</td>
			<td>${arr[2] === '' ? '' :arr[2].gst}</td>
			<td>${arr[2] === '' ? '' :gstAmt2}</td>
			<td>${arr[2] === '' ? '' :gstAmt2 + subTotal2}</td>
		</tr>
		<tr>
		<td>${arr[3] === '' ? '' : 4}</td>
		<td>${arr[3] === '' ? '' :arr[3].itemCode}</td>
		<td style="text-align: left">
			<strong>${arr[3] === '' ? '' :arr[3].item}</strong><br>
			<div style="font-size: 8px">
			${arr[3] === '' ? '' :'Batch:' + arr[3].lotNo}<br>
			${arr[3].exp === null || arr[3].exp === undefined ? '' :'Expiry:' + arr[3].exp.split('T')[0].split('-')[2] + '-' + arr[3].exp.split('T')[0].split('-')[1] + '-' + arr[3].exp.split('T')[0].split('-')[0]}
			</div>
		</td>
		<td>${arr[3] === '' ? '' :arr[3].hsn}</td>
		<td>${arr[3] === '' ? '' :arr[3].checkout}</td>
		<td>${arr[3] === '' ? '' :arr[3].uom}</td>
		<td>${arr[3] === '' ? '' :parseFloat(arr[3].sellingRate)}</td>
		<td>${arr[3] === '' ? '' :subTotal3}</td>
		<td>${arr[3] === '' ? '' :arr[3].gst}</td>
		<td>${arr[3] === '' ? '' :gstAmt3}</td>
		<td>${arr[3] === '' ? '' :gstAmt3 + subTotal3}</td>
	</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		</table>
	</div>
	<div id="summary">
	    <div id="note">
		    <br/>
			<h4>Amount Chargeable(in words) :</h4>
			<p>${arr[19]}</p>
		</div>
		<div id="note">
		    <br/>
			<h4>Company's Bank Details:</h4>
			<p>Bank Name     :Indian Bank  </p>
			<p>Account Number:6759192854</p>
			<p>Branch        : Indira Nagar,Lucknow -226016  </p>
			<p>IFSC Code     : IDIB0001012  </p>
		</div>
		
		<div id="total">
			<table border="1">
				<tr>
					<td>Total Amount</td>
					<td>₹${subTotal0+subTotal1+subTotal2+subTotal3}</td>
				</tr>
				<tr>
					<td>CGST</td>
					<td>₹${arr[18]?'0':(gstAmt0+gstAmt1+gstAmt2+gstAmt3)/2}</td>
				</tr>
				<tr>
					<td>SGST</td>
					<td>₹${arr[18]?'0':(gstAmt0+gstAmt1+gstAmt2+gstAmt3)/2}</td>
				</tr>
				<tr>
					<td>IGST</td>
					<td>₹${arr[18]?gstAmt0+gstAmt1+gstAmt2+gstAmt3:'0'}</td>
				</tr>
				<tr>
					<td>Total GST Amount</td>
					<td>₹${gstAmt0+gstAmt1+gstAmt2+gstAmt3}</td>
				</tr>
				<tr>
					<td>Grand Total</td>
					<td>₹${subTotal0+subTotal1+subTotal2+subTotal3+gstAmt0+gstAmt1+gstAmt2+gstAmt3}</td>
				</tr>
			</table>
		</div>
		<div style= 'position:absolute;
		bottom:90px;
		right:60px;
		text-align:center'>
		<p>For SATVIK SOLUTIONS</p>
	        
	          <br/>
	          <br/>
	          <br/>
		<p>Authorised Signatory</p>
		</div>
		<div id="note">
		<br/>
			<h4>Declaration :</h4>
			<p>We declare that this invoice shows the actual price of the goods described and all particulars are true and correct.</p>
			<p>1. Any claim by the purchaser which is based on a pre dispatcch defects shall be notified within 7 days from the date of the sale.</p>
			<p>2. Interest @24% will be charged in delay payments.</p>
		</div>
	</div>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
	<div id="footer">
		<p>Subject to Lucknow Jurisdiction</p>
	</div>
</div>
</body>
</html>
	`;
 };