<?php
require('fpdf/fpdf.php');

$idno = $_POST['idnum'];
$otrtype = $_POST['type'];


include_once 'config/database.php';
$database = new Database();
$db = $database->getConnection();
$stmt = $db->prepare("exec spRPT_OTRDetails @idnumber = '".$idno."', @OTRType=".$otrtype);  
$stmt->execute();


$page=1;
$row = 0;
$pdf = new FPDF('P','mm',array(330.2,215.9));
$pdf->AddPage('P');


$image1 = 'fpdf/logo300w.png';
$pdf->Image($image1, 25, 17, 33,33);
$image1 = 'fpdf/No_Image_Available.gif';
$pdf->Image($image1, 167, 21, 24,24);


  $stmtpic = $db->prepare("select idpicture from picture where idnumber='".$idno."'");  
  $stmtpic->execute();
  $stmtpic->bindColumn(1, $image, PDO::PARAM_LOB, 0, PDO::SQLSRV_ENCODING_BINARY);
  $stmtpic->fetch(PDO::FETCH_ASSOC);
  if ($image!=null) {
  	$dataURI2= "data:image/jpeg;base64,".base64_encode($image);
	$pic = getImage($dataURI2);
	$pdf->Image($pic[0], 166,20,27,27, $pic[1]);
  }

function getImage($dataURI){
  $img = explode(',',$dataURI,2);
  $pic = 'data://text/plain;base64,'.$img[1];
  $type = explode("/", explode(':', substr($dataURI, 0, strpos($dataURI, ';')))[1])[1]; // get the image type
  if ($type=="png"||$type=="jpeg"||$type=="gif") return array($pic, $type);
  return false;
}



$pdf->AddFont('Helvetica','','helvetica.php');
$pdf->AddFont('Times','','times.php');

$pdf->Setfont('Times','B',13.5);
$pdf -> SetY(9);
$pdf -> SetX(75);
$pdf->Text(107.8-$pdf->GetStringWidth("UNIVERSITY OF SAINT LOUIS")/2,20,"UNIVERSITY OF SAINT LOUIS");

$pdf->Setfont('Times','I',12);
$pdf->Text(107.8-$pdf->GetStringWidth("Formerly SaintLouis College of Tuguegarao")/2,25,"Formerly SaintLouis College of Tuguegarao");

$pdf->Setfont('Times','',10.5);
$pdf->Text(107.8-$pdf->GetStringWidth("Tuguegarao City, Philippines 3500")/2,29,"Tuguegarao City, Philippines 3500");

$pdf -> SetY(33);
$pdf -> SetX(107.5-42);
$pdf->Setfont('Times','B',11);
$pdf->Cell(84,6," ",'TLR',1,'C',false);

$pdf -> SetY(35);
$pdf -> SetX(107.5-42);
$pdf->Setfont('Times','B',11);

$pdf->Cell(84,6,"Granted FULL AUTONOMY\n",'LR',1,'C',false);
$pdf -> SetY(37);
$pdf -> SetX(107.5-42);
$pdf->Setfont('Times','',10.5);
$pdf->Cell(84,6," ",'LR',1,'C',false);

$pdf -> SetY(39);
$pdf -> SetX(107.5-42);
$pdf->Setfont('Times','',10.5);
$pdf->Cell(84,6,"by the Commission on Higher Education",'LR',1,'C',false);

$pdf -> SetY(41);
$pdf -> SetX(107.5-42);
$pdf->Setfont('Times','i',10.5);
$pdf->Cell(84,6,"",'BLR',1,'C',false);



$pdf->Setfont('Helvetica','B',15);
$pdf->Text(107.8-$pdf->GetStringWidth("OFFICIAL TRANSCRIPT OF RECORDS")/2,55,"OFFICIAL TRANSCRIPT OF RECORDS");
$row = 60;

$stmtpersoninfo = $db->prepare("exec spRPT_OTRHeader_PersonInfo @idnumber = '".$idno."'");  
$stmtpersoninfo ->execute();
$recpersoninfo = $stmtpersoninfo ->fetch();

$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','B',9);
$pdf->Cell(109,5," ",'TLR',1,'L',false);
$row = $row + 2;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','B',9);
$pdf->Cell(109,5," NAME",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(57.5);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(63);
		$tempFontSize = 9;
		while($pdf->getStringWidth(strtoupper($recpersoninfo[1])) >63){// loop until the string width is smaller than cell width
        		$pdf->SetFontSize($tempFontSize -= 0.1);
    		}
$pdf->Setfont('Helvetica','B',$tempFontSize);
$pdf->Cell(84,5,$recpersoninfo[1],'',1,'L',false);

$row = $row + 5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','B',9);
$pdf->Cell(109,5," Complete Home Address",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(57.5);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row+0.5);
$pdf -> SetX(63);
$pdf->Setfont('Helvetica','',9);
$pdf->MultiCell( 63, 4,$recpersoninfo[7], 0, 'L');

$row = $row + 4.9;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Cell(109,10," ",'LR',1,'L',false);

$row = $row + 5.5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','BU',9);
$pdf->Cell(109,5,"ENTRANCE DATA:",'LR',1,'L',false);


$row = $row + 5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','B',9);
$pdf->Cell(109,5," Elementary",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(57.5);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(63);
$pdf->Setfont('Helvetica','',9);
	$tempFontSize = 9;
	while($pdf->getStringWidth(strtoupper($recpersoninfo[1])) >63){// loop until the string width is smaller than cell width
    		$pdf->SetFontSize($tempFontSize -= 0.1);
		}
	$pdf->Setfont('Helvetica','',$tempFontSize);
	if($recpersoninfo[8]==""){$recpersoninfo[8] = "Not Applicable";}
	$pdf->MultiCell( 63, 5,$recpersoninfo[8], 0, 'L');
$row = $row + 5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','B',9);
$pdf->Cell(109,5," Junior High School",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(57.5);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(63);

	$tempFontSize = 9;
	while($pdf->getStringWidth(strtoupper($recpersoninfo[1])) >63){// loop until the string width is smaller than cell width
    		$pdf->SetFontSize($tempFontSize -= 0.1);
		}
	$pdf->Setfont('Helvetica','',$tempFontSize);
	if($recpersoninfo[9]==""){$recpersoninfo[9] = "Not Applicable";}
	$pdf->MultiCell( 63, 5,$recpersoninfo[9], 0, 'L');

$row = $row + 5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','B',9);
$pdf->Cell(109,5," Senior High School",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(57.5);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(63);

	$tempFontSize = 9;
	while($pdf->getStringWidth(strtoupper($recpersoninfo[1])) >63){// loop until the string width is smaller than cell width
    		$pdf->SetFontSize($tempFontSize -= 0.1);
		}
	$pdf->Setfont('Helvetica','',$tempFontSize);
	if($recpersoninfo[10]==""){$recpersoninfo[10] = "Not Applicable";}
	$pdf->MultiCell( 63, 5,$recpersoninfo[10], 0, 'L');



$row = $row + 5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','B',9);
$pdf->Cell(109,5," College",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(57.5);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(63);
	$tempFontSize = 9;
	while($pdf->getStringWidth(strtoupper($recpersoninfo[1])) >63){// loop until the string width is smaller than cell width
    		$pdf->SetFontSize($tempFontSize -= 0.1);
		}
	$pdf->Setfont('Helvetica','',$tempFontSize);
	if($recpersoninfo[11]==""){$recpersoninfo[11] = "Not Applicable";}
	$pdf->MultiCell( 63, 5,$recpersoninfo[11], 0, 'L');

$row = $row +5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','B',9);
$pdf->Cell(109,5," Post Graduate (if any)",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(57.5);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(63);
	$tempFontSize = 9;
	while($pdf->getStringWidth(strtoupper($recpersoninfo[1])) >63){// loop until the string width is smaller than cell width
    		$pdf->SetFontSize($tempFontSize -= 0.1);
		}
	$pdf->Setfont('Helvetica','',$tempFontSize);
	if($recpersoninfo[12]==""){$recpersoninfo[12] = "Not Applicable";}
	$pdf->MultiCell( 63, 5,$recpersoninfo[12], 0, 'L');

$pdf -> SetY($row + 5);
$pdf -> SetX(18);
$pdf->Cell(109,5," ",'LR',1,'L',false);

$row = $row + 4.4;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Cell(109,5," ",'LR',1,'L',false);
//Record of graduation
$stmtrog = $db->prepare("exec spRPT_OTRHeader_RecordOfGraduation  @idnumber = '".$idno."', @OTRType=".$otrtype."");  
$stmtrog ->execute();
$recrog = $stmtrog ->fetch();

if($recrog[1]=="")
{$degree = "Not Applicable";}else{$degree = $recrog[1];}
if($recrog[2]=="")
{$major = "Not Applicable";}else{$major = $recrog[2];}
if($recrog[3]=="")
{$dateofgrad = "Not Applicable";}else{$dateofgrad = date("F j, Y", strtotime($recrog[3]));}
if($recrog[4]=="")
{$sonumber = "Not Applicable";}else{$sonumber = $recrog[4];}
if($recrog[5]=="")
{$awards = "Not Applicable";}else{$awards = $recrog[5];}
if($recrog[6]=="")
{$nstpnumber = "Not Applicable";}else{$nstpnumber = $recrog[6];}


$dean = $recrog[7];
$position = $recrog[8];

$row = $row + 5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','BU',9);
$pdf->Cell(109,5,"RECORD OF GRADUATION:",'LR',1,'L',false);
$row = $row + 5.5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','B',9);
$pdf->Cell(109,5," Degree/Title",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(57.5);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(63);
$pdf->Setfont('Helvetica','',9);

while($pdf->getStringWidth(strtoupper($recpersoninfo[1])) >63){// loop until the string width is smaller than cell width
    		$pdf->SetFontSize($tempFontSize -= 0.1);
		}
	$pdf->Setfont('Helvetica','',$tempFontSize);
	$pdf->Cell(84,5,$degree,'',1,'L',false);

$pdf -> SetY($row-8);
$pdf -> SetX(18);
$pdf->Cell(109,10,"",'LR',1,'L',false);

$row = $row + 5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','B',9);
$pdf->Cell(109,5," Major",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(57.5);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(63);
$pdf->Setfont('Helvetica','',9);
$pdf->Cell(84,5,$major,'',1,'L',false);

$row = $row + 5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','B',9);
$pdf->Cell(109,5," Date of Graduation",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(57.5);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(63);
$pdf->Setfont('Helvetica','',9);
$pdf->Cell(84,5,$dateofgrad,'',1,'L',false);


$row = $row + 5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','B',9);
$pdf->Cell(109,5," Special Order Number",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(57.5);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(63);
$pdf->Setfont('Helvetica','',9);
$pdf->Cell(84,5,$sonumber,'',1,'L',false);

$row = $row + 5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','B',9);
$pdf->Cell(109,5," Awards Received",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(57.5);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(63);
$pdf->Setfont('Helvetica','',9);
$pdf->Cell(84,5,$awards,'',1,'L',false);

$row = $row + 5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','B',9);
$pdf->Cell(109,5," NSTP Serial No.",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(57.5);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(63);
$pdf->Setfont('Helvetica','',9);
$pdf->Cell(84,5,$nstpnumber,'',1,'L',false);

$row = $row;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Cell(109,5,"",'LR',1,'L',false);
$row = $row+2.5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Cell(109,5,"",'BLR',1,'L',false);


//second table

$row = 60;

$pdf -> SetY($row);
$pdf -> SetX(130.5);
$pdf->Setfont('Helvetica','B',8);
$pdf->Cell(70,5," Student ID Number",'TLR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(164);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(165.5);
$pdf->Setfont('Helvetica','',8);
$pdf->Cell(84,5,$recpersoninfo[0],'',1,'L',false);

$row = $row + 3.6;
$pdf -> SetY($row);
$pdf->Setfont('Helvetica','B',8);
$pdf -> SetX(130.5);
$pdf->Cell(70,5," Gender",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(164);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row+0.5);
$pdf -> SetX(165.5);
$pdf->Setfont('Helvetica','',8);
if($recpersoninfo[2]=="M"){
	$pdf->Cell(84,5,"Male",'',1,'L',false);
}else
{
	$pdf->Cell(84,5,"Female",'',1,'L',false);
}



$row = $row + 3.6;
$pdf -> SetY($row);
$pdf->Setfont('Helvetica','B',8);
$pdf -> SetX(130.5);
$pdf->Cell(70,5," Date of Birth",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(164);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row+0.5);
$pdf -> SetX(165.5);
$pdf->Setfont('Helvetica','',8);
$pdf->Cell(84,5,date("F j, Y", strtotime($recpersoninfo[3])),'',1,'L',false);

$row = $row + 3.6;
$pdf -> SetY($row);
$pdf->Setfont('Helvetica','B',8);
$pdf -> SetX(130.5);
$pdf->Cell(70,5," Citizenship",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(164);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row+0.5);
$pdf -> SetX(165.5);
$pdf->Setfont('Helvetica','',8);
$pdf->Cell(84,5,ucwords(strtolower($recpersoninfo[4])),'',1,'L',false);


$row = $row + 3.6;
$pdf -> SetY($row);
$pdf->Setfont('Helvetica','B',8);
$pdf -> SetX(130.5);
$pdf->Cell(70,5," Civil Status",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(164);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row+0.5);
$pdf -> SetX(165.5);
$pdf->Setfont('Helvetica','',8);
if($recpersoninfo[5]=="S")
{
$pdf->Cell(84,5,"Single",'',1,'L',false);
}elseif($recpersoninfo[5]=="M")
{
$pdf->Cell(84,5,"Married",'',1,'L',false);
}elseif($recpersoninfo[5]=="W")
{
$pdf->Cell(84,5,"Widowed",'',1,'L',false);
}elseif($recpersoninfo[5]=="D")
{
$pdf->Cell(84,5,"Divorced",'',1,'L',false);
}
$row = $row + 3.6;
$pdf -> SetY($row);
$pdf->Setfont('Helvetica','B',8);
$pdf -> SetX(130.5);
$pdf->Cell(70,5," Religion",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(164);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row+0.5);
$pdf -> SetX(165.5);
$pdf->Setfont('Helvetica','',8);
$pdf->Cell(84,5,ucwords(strtolower($recpersoninfo[6])),'',1,'L',false);

$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(130.5);
$pdf->Setfont('Helvetica','',8);
$pdf->Cell(70,5," ",'LR',1,'L',false);


$row = $row +1;
$pdf -> SetY($row);
$pdf -> SetX(130.5);
$pdf->Setfont('Helvetica','BU',8);
$pdf->Cell(70,5,"ADMISSION CREDENTIALS:",'LR',1,'C',false);

$stmtadmissionstatus = $db->prepare("exec spRPT_OTRHeader_AdmissionCredentials @idnumber = '".$idno."'");  
$stmtadmissionstatus ->execute();
$recadmissionstatus= $stmtadmissionstatus->fetch();

$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(130.5);
$pdf->Setfont('Helvetica','B',8);
$pdf->Cell(70,5," Admission Status",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(167.8);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(170.8);
$pdf->Setfont('Helvetica','',8);
$pdf->Cell(84,5,$recadmissionstatus[0],'',1,'L',false);

$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(130.5);
$pdf->Setfont('Helvetica','B',8);
$pdf->Cell(70,5," Admission Credentials",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(167.8);
$pdf->Cell(84,5,":",'',1,'L',false);

$pdf -> SetY($row+1);
$pdf -> SetX(170.8);
$tempFontSize =8;
if($pdf->getStringWidth(strtoupper($recadmissionstatus[1]))<32)
	{
		$tempFontSize =8;
	}else
		$tempFontSize =6.5;
	{
	}
	$pdf->Setfont('Helvetica','',$tempFontSize);
	$pdf->MultiCell(32, 2.5,$recadmissionstatus[1], 0, 'L');

$pdf -> SetY($row + 3.5);
$pdf -> SetX(130.5);
$pdf->Cell(70,5,"",'LR',1,'L',false);

$row = $row + 6;
$pdf -> SetY($row);
$pdf -> SetX(130.5);
$pdf->Setfont('Helvetica','B',8);
$pdf->Cell(70,5," Date of Admission",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(167.8);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(170.8);
$pdf->Setfont('Helvetica','',8);
$pdf->Cell(84,5,date("F j, Y", strtotime($recadmissionstatus[2])),'',1,'L',false);

$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(130.5);
$pdf->Setfont('Helvetica','B',8);
$pdf->Cell(70,5," Program/Course Enrolled",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(167.8);
$pdf->Cell(84,5,":",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(170.8);
$pdf->Setfont('Helvetica','',8);
$pdf->Cell(84,5,$recadmissionstatus[3],'',1,'L',false);


$pdf -> SetY($row + 3.6);
$pdf -> SetX(130.5);
$pdf->Cell(70,5," ",'LR',1,'L',false);
$row = $row + 1;

$pdf -> SetY($row + 3.6);
$pdf -> SetX(132);
$pdf->Setfont('Helvetica','B',8);
$pdf->Cell(67,5," Official Marks",'TLRB',1,'C',false);

$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(130.5);
$pdf->Cell(70,5," ",'LR',1,'L',false);
$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(130.5);
$pdf->Cell(70,5," ",'LR',1,'L',false);

$row = $row + 1;
$pdf -> SetY($row);
$pdf -> SetX(137.5);
$pdf->Setfont('Helvetica','B',8);
$pdf->Cell(70,5,"95-100       - 1.25-1.00",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(170.8);
$pdf->Cell(84,5,"Distinguished",'',1,'L',false);

$row = $row - 3.6;
$pdf -> SetY($row);
$pdf -> SetX(130.5);
$pdf->Cell(70,5," ",'LR',1,'L',false);

$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(130.5);
$pdf->Cell(70,5," ",'LR',1,'L',false);


$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(137.5);
$pdf->Cell(70,5,"90-94         - 1.50-1.30",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(170.8);
$pdf->Cell(84,5,"Excellent",'',1,'L',false);

$pdf -> SetY($row - 3.6);
$pdf -> SetX(130.5);
$pdf->Cell(70,5," ",'LR',1,'L',false);

$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(137.5);
$pdf->Cell(70,5,"85-89         - 2.00-1.60",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(170.8);
$pdf->Cell(84,5,"Very Good",'',1,'L',false);

$pdf -> SetY($row- 3.6);
$pdf -> SetX(130.5);
$pdf->Cell(70,5," ",'LR',1,'L',false);

$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(137.5);
$pdf->Setfont('Helvetica','B',8);
$pdf->Cell(70,5,"80-84         - 2.50-2.10",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(170.8);
$pdf->Cell(84,5,"Good",'',1,'L',false);

$pdf -> SetY($row - 3.6);
$pdf -> SetX(130.5);
$pdf->Cell(70,5," ",'LR',1,'L',false);

$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(137.5);
$pdf->Setfont('Helvetica','B',8);
$pdf->Cell(70,5,"75-79         - 3.00-2.60",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(170.8);
$pdf->Cell(84,5,"Passing",'',1,'L',false);

$pdf -> SetY($row - 3.6);
$pdf -> SetX(130.5);
$pdf->Cell(70,5," ",'LR',1,'L',false);

$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(137.5);
$pdf->Setfont('Helvetica','B',8);
$pdf->Cell(70,5,"75-below   - 5.00",'',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(170.8);
$pdf->Cell(84,5,"Failed",'',1,'L',false);

$pdf -> SetY($row - 3.6);
$pdf -> SetX(130.5);
$pdf->Cell(70,5," ",'LR',1,'L',false);
$pdf -> SetY($row);
$pdf -> SetX(130.5);
$pdf->Cell(70,5," ",'LR',1,'L',false);


$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(137.5);
$pdf->Setfont('Helvetica','B',8);
$pdf->Cell(70,5,"N - No Final Exam",'',1,'L',false);

$pdf -> SetY($row );
$pdf -> SetX(130.5);
$pdf->Cell(70,5," ",'LR',1,'L',false);

$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(137.5);
$pdf->Setfont('Helvetica','B',8);
$pdf->Cell(70,5,"WP - Withdrawn w/ Permission",'',1,'L',false);

$pdf -> SetY($row );
$pdf -> SetX(130.5);
$pdf->Cell(70,5," ",'LR',1,'L',false);

$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(137.5);
$pdf->Setfont('Helvetica','B',8);
$pdf->Cell(70,5,"D - Dropped",'',1,'L',false);

$pdf -> SetY($row );
$pdf -> SetX(130.5);
$pdf->Cell(70,5," ",'LR',1,'L',false);

$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(137.5);
$pdf->Setfont('Helvetica','B',8);
$pdf->Cell(70,5,"P - Passed",'',1,'L',false);

$pdf -> SetY($row );
$pdf -> SetX(130.5);
$pdf->Cell(70,5," ",'LR',1,'L',false);


$row = $row + 3.6;
$pdf -> SetY($row);
$pdf -> SetX(137.5);
$pdf->Setfont('Helvetica','B',8);
$pdf->Cell(70,5,"F - Failed",'',1,'L',false);

$row = $row;
$pdf -> SetY($row);
$pdf -> SetX(130.5);
$pdf->Cell(70,5,"",'BLR',1,'L',false);


$row = $row+7;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','B',10);
$pdf->Cell(182.5,5,"Remarks",'',1,'L',false);

$row = $row;
$pdf -> SetY($row+5);
$pdf->Setfont('Helvetica','',10);
$pdf -> SetX(18);
$pdf->Cell(182.5,6," ",'TLR',1,'L',false);
$stmtremarks = $db->prepare("exec spRPT_OTRHeader_Remarks  @idnumber = '".$idno."'");  
$stmtremarks->execute();

while($recremarks = $stmtremarks->fetch()){
	 if (($otrtype == 1 || $otrtype == 4 || $otrtype == 5) && ($recremarks[0] == 1 || $recremarks[0] == 4 || $recremarks[0] == 5)) {
	 	if (  $recremarks[1]  != "") {
	   		$row = $row+5.5;
			$pdf -> SetY($row);
			$pdf -> SetY($row);
			$pdf -> SetX(18);
			$pdf->MultiCell(180, 4,$recremarks[1], 0, 'L');

			$pdf -> SetY($row);
			$pdf -> SetX(18);
			$pdf->Cell(182.5,6," ",'LR',1,'L',false);
			$rcounter=180;
			while ($pdf->getStringWidth(strtoupper($recremarks[1])) > $rcounter) {
			    $row = $row+5.5;
				$pdf -> SetY($row);
				$pdf -> SetX(18);
				$pdf->Cell(182.5,6,"  ",'LR',1,'L',false);
				$rcounter+=180;
			}
	 		# code...
	 	}
	   }else  

	  if ($otrtype == 2 && $recremarks[0] != 3) {
	   		if ( $recremarks[1] != "") {
	   		$row = $row+5.5;
			$pdf -> SetY($row);
			$pdf -> SetY($row);
			$pdf -> SetX(18);
			$pdf->MultiCell(180, 4,$recremarks[1], 0, 'L');

			$pdf -> SetY($row);
			$pdf -> SetX(18);
			$pdf->Cell(182.5,6," ",'LR',1,'L',false);
			$rcounter=180;
			while ($pdf->getStringWidth(strtoupper($recremarks[1])) > $rcounter) {
			    $row = $row+5.5;
				$pdf -> SetY($row);
				$pdf -> SetX(18);
				$pdf->Cell(182.5,6,"  ",'LR',1,'L',false);
				$rcounter+=180;
			}
	 		# code...
	 	}
	   }else if ($otrtype == 3) 
	    {
	   		if (  $recremarks[1] != "") {
	   		$row = $row+5.5;
			$pdf -> SetY($row);
			$pdf -> SetY($row);
			$pdf -> SetX(18);
			$pdf->MultiCell(180, 4,$recremarks[1], 0, 'L');

			$pdf -> SetY($row);
			$pdf -> SetX(18);
			$pdf->Cell(182.5,6," ",'LR',1,'L',false);
			$rcounter=180;
			while ($pdf->getStringWidth(strtoupper($recremarks[1])) > $rcounter) {
			    $row = $row+5.5;
				$pdf -> SetY($row);
				$pdf -> SetX(18);
				$pdf->Cell(182.5,6,"  ",'LR',1,'L',false);
				$rcounter+=180;
			}
	 		# code...
	 	}
	   }



	    
}

	$row = $row+1;
	$pdf -> SetY($row);
	$pdf->Setfont('Helvetica','',10);
	$pdf -> SetX(18);
	$pdf->Cell(182.5,5," ",'BLR',1,'L',false);

$row = $row +10;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf -> SetFillColor(220, 220, 220);
$pdf->Setfont('Helvetica','B',10);
$pdf->Cell(30,7," COURSE NO.",'TL',1,'C',1);
$pdf -> SetY($row);
$pdf -> SetX(48);
$pdf->Cell(117.2,7,"DESCRIPTIVE TITLE",'T',1,'C',1);
$pdf -> SetY($row);
$pdf -> SetX(165.2);
$pdf->Cell(18,7,"GRADES",'T',1,'C',1);
$pdf -> SetY($row);
$pdf -> SetX(183);
$pdf->Cell(17.8,7,"UNITS",'RT',1,'C',1);


$sem='';
$school='';
while ($rec = $stmt->fetch()) {

	if ($row>254) {
				
				$pdf -> SetY($row);
				$pdf -> SetX(18);
				$pdf->Cell(30,5," ",'B',1,'L',0);
				$pdf -> SetY($row);
				$pdf -> SetX(48);
				$pdf->Cell(117.2,5," ",'B',1,'L',0);
				$pdf -> SetY($row);
				$pdf -> SetX(165.2);
				$pdf->Cell(18,5," ",'B',1,'C',0);
				$pdf -> SetY($row);
				$pdf -> SetX(183);
				$pdf->Cell(17.8,5," ",'B',1,'C',0);
				

				$pdf -> SetY(272);
				$pdf -> SetX(13);
				$pdf->Cell(30,5,"Prepared by:",'',1,'L',0);


				$pdf -> SetY(286);
				$pdf -> SetX(20);
				$pdf->Setfont('Times','B',10);
				$pdf->Cell(30,5,"MARY ANN D. MOLINA",'',1,'L',0);

				$pdf -> SetY(286);
				$pdf -> SetX(77);
				$pdf->Setfont('Times','B',10);
				$pdf->Cell(30,5,"LIZA M. EMPEDRAD.Ph.D.",'',1,'L',0);


				
				$pdf->Setfont('Times','B',10);
				$pdf->Text(168.8-$pdf->GetStringWidth($dean)/2,289,$dean);


				$pdf -> SetY(291);
				$pdf -> SetX(30);
				$pdf->Setfont('Times','',10);
				$pdf->Cell(30,5,"Records Clerk",'',1,'L',0);

				$pdf -> SetY(291);
				$pdf -> SetX(85);
				$pdf->Setfont('Times','',10);
				$pdf->Cell(30,5,"University Registrar",'',1,'L',0);


				$pdf->Setfont('Times','',10);
				$pdf->Text(168.8-$pdf->GetStringWidth($position)/2,294.5,$position);

				$pdf->Setfont('Helvetica','',10);
				$pdf->Text(40-$pdf->GetStringWidth("Not Valid")/2,310,"Not Valid");
				$pdf->Text(40-$pdf->GetStringWidth("Without the")/2,314,"Without the");
				$pdf->Text(40-$pdf->GetStringWidth("UNIVERSITY SEAL")/2,318,"UNIVERSITY SEAL");


				$pdf->Setfont('Helvetica','B',10);
				$pdf->Text(107.8-$pdf->GetStringWidth("*** CONTINUED NEXT PAGE ***")/2,312,"*** CONTINUED NEXT PAGE ***");
				$pdf->Text(107.8-$pdf->GetStringWidth("- ".$page." -")/2,316,"- ".$page." -");$page=$page+1;

		$pdf->AddPage('P');

			$row = 0;

			$image1 = 'fpdf/logo300w.png';
			$pdf->Image($image1, 25, 17, 33,33);

			$pdf->Setfont('Times','B',13.5);
			$pdf -> SetY(9);
			$pdf -> SetX(75);
			$pdf->Text(107.8-$pdf->GetStringWidth("UNIVERSITY OF SAINT LOUIS")/2,20,"UNIVERSITY OF SAINT LOUIS");

			$pdf->Setfont('Times','I',12);
			$pdf->Text(107.8-$pdf->GetStringWidth("Formerly SaintLouis College of Tuguegarao")/2,25,"Formerly SaintLouis College of Tuguegarao");

			$pdf->Setfont('Times','',10.5);
			$pdf->Text(107.8-$pdf->GetStringWidth("Tuguegarao City, Philippines 3500")/2,29,"Tuguegarao City, Philippines 3500");

							
				$pdf -> SetY(33);
				$pdf -> SetX(107.5-42);
				$pdf->Setfont('Times','B',11);
				$pdf->Cell(84,6," ",'TLR',1,'C',false);

				$pdf -> SetY(35);
				$pdf -> SetX(107.5-42);
				$pdf->Setfont('Times','B',11);

				$pdf->Cell(84,6,"Granted FULL AUTONOMY\n",'LR',1,'C',false);
				$pdf -> SetY(37);
				$pdf -> SetX(107.5-42);
				$pdf->Setfont('Times','',10.5);
				$pdf->Cell(84,6," ",'LR',1,'C',false);

				$pdf -> SetY(39);
				$pdf -> SetX(107.5-42);
				$pdf->Setfont('Times','',10.5);
				$pdf->Cell(84,6,"by the Commission on Higher Education",'LR',1,'C',false);

				$pdf -> SetY(41);
				$pdf -> SetX(107.5-42);
				$pdf->Setfont('Times','i',10.5);
				$pdf->Cell(84,6,"",'BLR',1,'C',false);


			$pdf->Setfont('Helvetica','B',15);
			$pdf->Text(107.8-$pdf->GetStringWidth("OFFICIAL TRANSCRIPT OF RECORDS")/2,55,"OFFICIAL TRANSCRIPT OF RECORDS");

			$row = 70;

				$pdf -> SetY($row);
				$pdf -> SetX(18);
				$pdf->Setfont('Helvetica','B',9);
				$pdf->Cell(135,5," NAME:",'TLR',1,'L',false);
				$pdf -> SetY($row);
				$pdf -> SetX(45);					
					$tempFontSize = 9;
					while($pdf->getStringWidth(strtoupper($recpersoninfo[1])) >63){// loop until the string width is smaller than cell width
    					$pdf->SetFontSize($tempFontSize -= 0.1);
					}
					$pdf->Setfont('Helvetica','B',$tempFontSize);
				$pdf->Cell(84,5,$recpersoninfo[1],'',1,'L',false);

				$row = $row +4;
				$pdf -> SetY($row);
				$pdf -> SetX(18);
					$tempFontSize = 9;
					while($pdf->getStringWidth(strtoupper($recpersoninfo[1])) >63){// loop until the string width is smaller than cell width
    					$pdf->SetFontSize($tempFontSize -= 0.1);
					}
					$pdf->Setfont('Helvetica','B',$tempFontSize);
				$pdf->Cell(135,5," Degree/Title:",'LR',1,'L',false);
				$pdf -> SetY($row);
				$pdf -> SetX(45);
				$pdf->Cell(84,5,$degree,'',1,'L',false);

				$row = $row +4;
				$pdf -> SetY($row);
				$pdf -> SetX(18);
				$pdf->Setfont('Helvetica','B',9);
				$pdf->Cell(135,5," Major:",'LR',1,'L',false);
				$pdf -> SetY($row);
				$pdf -> SetX(45);
				$pdf->Cell(84,5,$major,'',1,'L',false);
				
				$row = $row +3;
				$pdf -> SetY($row);
				$pdf -> SetX(18);
				$pdf->Setfont('Helvetica','B',9);
				$pdf->Cell(135,5,"",'BLR',1,'L',false);
				$pdf -> SetY($row);
				$pdf -> SetX(45);
				$pdf->Cell(84,5,"",'',1,'L',false);

				$row = 70;
					$pdf -> SetY($row);
					$pdf -> SetX(156);
					$pdf->Setfont('Helvetica','',9);
					$pdf->Cell(44.8,5," ID Number:   ".$idno,'TLR',1,'L',false); 

					$row = $row +4;
					$pdf -> SetY($row);
					$pdf -> SetX(156);
					$pdf->Cell(44.8,5,"",'LR',1,'L',false); 

					$row = $row +4;
					$pdf -> SetY($row);
					$pdf -> SetX(156);
					$pdf->Cell(44.8,5,"",'LR',1,'L',false); 

					$row = $row +3;
					$pdf -> SetY($row);
					$pdf -> SetX(156);
					$pdf->Cell(44.8,5,"",'BLR',1,'L',false); 
					
					$row=$row+15;

			$pdf -> SetY($row);
			$pdf -> SetX(18);
			$pdf -> SetFillColor(220, 220, 220);
			$pdf->Setfont('Helvetica','B',10);
			$pdf->Cell(30,7," COURSE NO.",'BTL',1,'C',1);
			$pdf -> SetY($row);
			$pdf -> SetX(48);
			$pdf->Cell(117.2,7,"DESCRIPTIVE TITLE",'BT',1,'C',1);
			$pdf -> SetY($row);
			$pdf -> SetX(165.2);
			$pdf->Cell(18,7,"GRADES",'BT',1,'C',1);
			$pdf -> SetY($row);
			$pdf -> SetX(183);
			$pdf->Cell(17.8,7,"UNITS",'BRT',1,'C',1);$row=$row+2;
	}

if ($school==$rec[6]) {
	
}else{

$row = $row + 7;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf -> SetFillColor(220, 220, 220);
$pdf->Setfont('Helvetica','B',9);
$pdf->Cell(30,5," ".$rec[6],'LT',1,'L',0);
$pdf -> SetY($row);
$pdf -> SetX(48);
$pdf->Cell(117.2,5," ",'T',1,'C',0);
$pdf -> SetY($row);
$pdf -> SetX(165.2);
$pdf->Cell(18,5,"",'T',1,'C',0);
$pdf -> SetY($row);
$pdf -> SetX(183);
$pdf->Cell(17.8,5,"",'TR',1,'C',0);
$school=$rec[6];
}




if ($sem==$rec[5]) {
	
}else{

$row = $row +  5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf -> SetFillColor(220, 220, 220);
$pdf->Setfont('Helvetica','B',9);
$pdf->Cell(30,5,"  ",'LBT',1,'L',0);
$pdf -> SetY($row);
$pdf -> SetX(48);
$wordsem = substr($rec[5], -1);
if ($wordsem=='1') {
	$wordsem = 'First Semester';
}else 
if ($wordsem=='2') {
	$wordsem = 'Second Semester';
}else
if ($wordsem=='3') {
	$wordsem = 'Summer';
}

$pdf->Cell(117.2,5,$wordsem ." ".substr($rec[5], 0,4)."-".substr($rec[5], 0,2).substr($rec[5], 4,2),'BT',1,'L',0);
$pdf -> SetY($row);
$pdf -> SetX(165.2);
$pdf->Cell(18,5,"",'TB',1,'C',0);
$pdf -> SetY($row);
$pdf -> SetX(183);
$pdf->Cell(17.8,5,"",'TBR',1,'C',0);
$sem = $rec[5];
}

$row = $row +  5;
$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','',9);
$pdf->Cell(30,5,$rec[1],'LR',1,'L',0);
$pdf -> SetY($row);
$pdf -> SetX(48);
	$tempFontSize = 9;
	while($pdf->getStringWidth(strtoupper($recpersoninfo[1])) >63){// loop until the string width is smaller than cell width
    		$pdf->SetFontSize($tempFontSize -= 0.1);
		}
	$pdf->Setfont('Helvetica','',$tempFontSize);
$pdf->Cell(117.2,5,$rec[2],'RL',1,'L',0);
$pdf -> SetY($row);
$pdf -> SetX(165.2);
$pdf->Cell(18,5,$rec[3],'L',1,'C',0);
$pdf -> SetY($row);
$pdf -> SetX(183);
$pdf->Cell(17.8,5,$rec[4],'RL',1,'C',0);
	

}


$pdf -> SetY($row);
$pdf -> SetX(18);
$pdf->Setfont('Helvetica','',9);
$pdf->Cell(30,5,"",'B',1,'L',0);
$pdf -> SetY($row);
$pdf -> SetX(48);
$pdf->Cell(117.2,5,"",'B',1,'L',0);
$pdf -> SetY($row);
$pdf -> SetX(165.2);
$pdf->Cell(18,5,"",'B',1,'C',0);
$pdf -> SetY($row);
$pdf -> SetX(183);
$pdf->Cell(17.8,5,"  ",'B',1,'C',0);

				$pdf->Text(107.8-$pdf->GetStringWidth("------------------------------------------end of transcript------------------------------------------")/2,$row +10,"------------------------------------------end of transcript------------------------------------------");

				$pdf -> SetY(272);
				$pdf -> SetX(13);
				$pdf->Setfont('Times','',9);
				$pdf->Cell(30,5,"Prepared by:",'',1,'L',0);


				$pdf -> SetY(286);
				$pdf -> SetX(20);
				$pdf->Setfont('Times','B',10);
				$pdf->Cell(30,5,"MARY ANN D. MOLINA",'',1,'L',0);

				$pdf -> SetY(286);
				$pdf -> SetX(77);
				$pdf->Setfont('Times','B',10);
				$pdf->Cell(30,5,"LIZA M. EMPEDRAD.Ph.D.",'',1,'L',0);


				$pdf->Setfont('Times','B',10);
				$pdf->Text(168.8-$pdf->GetStringWidth($dean)/2,289,$dean);


				$pdf -> SetY(291);
				$pdf -> SetX(30);
				$pdf->Setfont('Times','',10);
				$pdf->Cell(30,5,"Records Clerk",'',1,'L',0);

				$pdf -> SetY(291);
				$pdf -> SetX(85);
				$pdf->Setfont('Times','',10);
				$pdf->Cell(30,5,"University Registrar",'',1,'L',0);


				$pdf->Setfont('Times','',10);
				$pdf->Text(168.8-$pdf->GetStringWidth($position)/2,294.5,$position);

				$pdf->Setfont('Helvetica','',10);
				$pdf->Text(40-$pdf->GetStringWidth("Not Valid")/2,301,"Not Valid");
				$pdf->Text(40-$pdf->GetStringWidth("Without the")/2,305,"Without the");
				$pdf->Text(40-$pdf->GetStringWidth("UNIVERSITY SEAL")/2,309,"UNIVERSITY SEAL");

				$pdf -> SetY(305);
				$pdf -> SetX(15);
				$pdf->Cell(187,5,"",'B',1,'L',0);

				$pdf->Setfont('Times','',9.9);
				$pdf->Text(108-$pdf->GetStringWidth("One UNIT OF CREDIT is one hour of lecture or recitation, three hours of laboratory, drafting or shop work each week, for the")/2,314,"One UNIT OF CREDIT is one hour of lecture or recitation, three hours of laboratory, drafting or shop work each week, for the");
				$pdf->Text(108-$pdf->GetStringWidth("period of a complete semester.")/2,318,"period of a complete semester.");
				$pdf->Setfont('Helvetica','B',10);
				$pdf->Text(107.8-$pdf->GetStringWidth("- ".$page." -")/2,324,"- ".$page." -");

$pdf->Output();

 