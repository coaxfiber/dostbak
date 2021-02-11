<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

date_default_timezone_set("Asia/Manila");


function spProposal_Proponent_Select($id)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_Proponent_Select @ProposalID = :id");  
  $stmt->bindParam(':id',$id ); 
  $stmt->execute();
  $app_list =[];
  $x=0;
while ($row = $stmt ->fetch()) {
      $app_list[$x] =array(
            "id" => $row[0],
              "title" => $row[1],
              "abstract" => $row[2],
              "level" => $row[3] ,
              "inst" => $row[4] ,
              "created" => $row[5] ,
              "updated" => $row[6]
            );
            $x++;
}
  return  $app_list;
}

function spProposal_Proponent_Insert($ProposalID,$UserID,$FName,$MName,$LName,$SName)
{
$database = new Database();
$db = $database->getConnection();

  $ProposalID=htmlspecialchars(strip_tags($ProposalID));
  $UserID=htmlspecialchars(strip_tags($UserID));
  $FName=htmlspecialchars(strip_tags($FName));
  $MName=htmlspecialchars(strip_tags($MName));
  $LName=htmlspecialchars(strip_tags($LName));
  $SName=htmlspecialchars(strip_tags($SName));

  $stmt = $db->prepare("exec spProposal_Proponent_Insert
    @ProposalID = :ProposalID,
    @UserID = :UserID,
    @FName = :FName,
    @MName = :MName,
    @LName = :LName,
    @SName = :SName,
    @Email = :Email");   
  $stmt->bindParam(':ProposalID', $ProposalID); 
  $stmt->bindParam(':UserID', $UserID); 
  $stmt->bindParam(':FName', $FName); 
  $stmt->bindParam(':MName', $MName); 
  $stmt->bindParam(':LName', $LName); 
  $stmt->bindParam(':SName', $SName); 
  $stmt->execute();
  $app_list = array("id" =>$ProposalID,"id2" =>$UserID);
  return  $app_list;
}

function spProposal_Update($GeneralTitle,$LeadAgency,$Street,$Address_PSGC,$Telephone,$Fax,$Email,$FundingAgency_id,$TotalDuration,$createdBy,$id)
{
$database = new Database();
$db = $database->getConnection();

  $GeneralTitle=htmlspecialchars(strip_tags($GeneralTitle));
  $LeadAgency=htmlspecialchars(strip_tags($LeadAgency));
  $Street=htmlspecialchars(strip_tags($Street));
  $Address_PSGC=htmlspecialchars(strip_tags($Address_PSGC));
  $Telephone=htmlspecialchars(strip_tags($Telephone));
  $Fax=htmlspecialchars(strip_tags($Fax));
  $Email=htmlspecialchars(strip_tags($Email));

  $stmt = $db->prepare("exec spProposal_Update
    @GeneralTitle = :GeneralTitle,
    @LeadAgency = :LeadAgency,
    @Street = :Street,
    @Address_PSGC = :Address_PSGC,
    @Telephone = :Telephone,
    @Fax = :Fax,
    @Email = :Email,
    @FundingAgency_id = $FundingAgency_id,
    @TotalDuration = $TotalDuration,
    @createdBy = $createdBy,
    @id = $createdBy");   
  $stmt->bindParam(':Fax', $Fax); 
  $stmt->bindParam(':Email', $Email); 
  $stmt->bindParam(':Telephone', $Telephone); 
  $stmt->bindParam(':Address_PSGC', $Address_PSGC); 
  $stmt->bindParam(':Street', $Street); 
  $stmt->bindParam(':LeadAgency', $LeadAgency); 
  $stmt->bindParam(':GeneralTitle', $GeneralTitle); 
  $stmt->execute();
  $app_list = array("id" => true);
  return  $app_list;
}

function spResearch_Liststatus($status)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearch_List @status_id = :status");  
  $stmt->bindParam(':status',$status ); 
  $stmt->execute();
  $app_list =[];
  $x=0;
while ($row = $stmt ->fetch()) {
  


    $app_list[$x] =array(
            "id" => $row[0],
              "title" => $row[1],
              "abstract" => $row[2],
              "level" => $row[3] ,
              "inst" => $row[4] ,
              "created" => $row[5] ,
              "updated" => $row[6],
              "authors" => spResearchAuthor_Select($row[0]),
              "dis" => spResearchProgramDiscipline_Select($row[0])
            );
            $x++;
}
  return  $app_list;
}

function search($search,$type)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();
if ($type=='Title') {
  $stmt = $db->prepare("exec spResearchSearch_ByTitle @search = :search");  
}
if ($type=='Abstract') {
  $stmt = $db->prepare("exec spResearchSearch_ByAbstract @search = :search");  
}
if ($type=='Author') {
  $stmt = $db->prepare("exec spResearchSearch_ByAuthor @search = :search");  
}
if ($type=='Company') {
  $stmt = $db->prepare("exec spResearchSearch_ByCompany @companyName = :search");  
}
if ($type=='Keyword') {
  $stmt = $db->prepare("exec spResearchSearch_ByKeyword @search = :search");  
}
if ($type=='Program Discipline') {
  $stmt = $db->prepare("exec spResearchSearch_ByProgramDisciplineDesc @prog_discipline_desc = :search");  
}
  $stmt->bindParam(':search',$search ); 
  $stmt->execute();
  $app_list =[];
  $x=0;
while ($row = $stmt ->fetch()) {
  


    $app_list[$x] =array(
            "id" => $row[0],
              "title" => $row[1],
              "abstract" => $row[2],
              "level" => $row[3] ,
              "inst" => $row[4] ,
              "created" => $row[5] ,
              "authors" => spResearchAuthor_Select($row[0]),
              "dis" => spResearchProgramDiscipline_Select($row[0])
            );
            $x++;
}
  return  $app_list;
}


function spResearchSearch_ByCompany($name)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchSearch_ByCompany @companyName = :name");  
  $stmt->bindParam(':name',$name ); 
  $stmt->execute();
  $app_list =[];
  $x=0;
while ($row = $stmt ->fetch()) {
  


    $app_list[$x] =array(
            "id" => $row[0],
              "title" => $row[1],
              "abstract" => $row[2],
              "level" => $row[3] ,
              "inst" => $row[4] ,
              "created" => $row[5] ,
              "updated" => $row[6],
              "authors" => spResearchAuthor_Select($row[0]),
              "dis" => spResearchProgramDiscipline_Select($row[0])
            );
            $x++;
}
  return  $app_list;
}



function spResearchSearch_ByProgramDisciplineDesc($desc)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchSearch_ByProgramDisciplineDesc @prog_discipline_desc = :desc");  
  $stmt->bindParam(':desc',$desc ); 
  $stmt->execute();
  $app_list =[];
  $x=0;
while ($row = $stmt ->fetch()) {
  


    $app_list[$x] =array(
            "id" => $row[0],
              "title" => $row[1],
              "abstract" => $row[2],
              "level" => $row[3] ,
              "inst" => $row[4] ,
              "created" => $row[5] ,
              "updated" => $row[6],
              "authors" => spResearchAuthor_Select($row[0]),
              "dis" => spResearchProgramDiscipline_Select($row[0])
            );
            $x++;
}
  return  $app_list;
}

function spResearch_Select($id)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearch_Select @ID = :id");  
  $stmt->bindParam(':id',$id ); 
  $stmt->execute();
  $app_list =[];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] =array(
            "id" => $row[0],
              "title" => $row[1],
              "abstract" => $row[2],
              "level" => $row[3] ,
              "inst" => $row[4] ,
              "created" => $row[5] ,
              "updated" => $row[6]  ,
              "statusid" => $row[7]  ,
              "statusdesc" => $row[8]);
            $x++;
}
  return  $app_list;
}


function spRPTResearch_RecentlyPublished()
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spRPTResearch_RecentlyPublished");  
  $stmt->execute();
  $app_list =[];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] =array(
            "id" => $row[0],
              "name" => $row[1],
              "fname" => $row[2],
              "mname" => $row[3] );
            $x++;
}
  return  $app_list;
}


function spRPTResearch_TotalCount_byStatus($x)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spRPTResearch_TotalCount_byStatus @statusID = :x");  
  
  $stmt->bindParam(':x', $x);
  $stmt->execute();
  $app_list =[];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] =array(
              "count" => $row[0] );
            $x++;
}
  return  $app_list;
}

function spUser_EmailConfirmationDetail_Update($id){
  $database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spUser_EmailConfirmationDetail_Update
    @userID = :id
    ");  
  $stmt->bindParam(':id', $id);
  $stmt->execute();
  $app_list = array(
              "status" => 'success' );

  return  $app_list;
}


function spUser_List()
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spUser_List");  
  
  $stmt->execute();
  $app_list =[];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] =array(
              "id" => $row[0],
              "lname" => $row[1],
              "fname" => $row[2],
              "mname" => $row[3],
              "suffix" => $row[4],
              "email" => $row[5] );
            $x++;
}
  return  $app_list;
}function spKeyword_List()
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spKeyword_List");  
  
  $stmt->execute();
  $app_list =[];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = $row[0];
            $x++;
}
  return  $app_list;
}
function spCallForProposal_Delete($id){
  $database = new Database();
  $db = $database->getConnection();

  $stmt = $db->prepare("exec spCallForProposal_Delete
    @id = :id
    ");  
  $stmt->bindParam(':id', $id); 
  $stmt->execute();
  $app_list = array(
              "status" => $name );

  return  $app_list;
}
function spCallForProposal_update($id,$name,$desc,$sdate,$edate,$fesdate,$feedate,$fagency){
  $database = new Database();
  $db = $database->getConnection();

  $stmt = $db->prepare("exec spCallForProposal_Update
    @id = :id,
    @Name = :name,
    @Description = :desc,
    @sdate = :sdate,
    @edate = :edate,
    @FinalEvaluationStartDate = :fesdate,
    @FinalEvaluationEndDate = :feedate,
    @FundingAgency_id = :fagency
    ");  
  $stmt->bindParam(':id', $id);
  $stmt->bindParam(':name', $name); 
  $stmt->bindParam(':desc', $desc); 
  $stmt->bindParam(':sdate', $sdate); 
  $stmt->bindParam(':edate', $edate); 
  $stmt->bindParam(':fesdate', $fesdate); 
  $stmt->bindParam(':feedate', $feedate); 
  $stmt->bindParam(':fagency', $fagency); 
  $stmt->execute();
  $app_list = array(
              "status" => $name );

  return  $app_list;
}
function spCallForProposal_Insert($name,$desc,$sdate,$edate,$fesdate,$feedate,$fagency){
  $database = new Database();
  $db = $database->getConnection();

  $stmt = $db->prepare("exec spCallForProposal_Insert
    @Name = :name,
    @Description = :desc,
    @sdate = :sdate,
    @edate = :edate,
    @FinalEvaluationStartDate = :fesdate,
    @FinalEvaluationEndDate = :feedate,
    @FundingAgency_id = :fagency
    ");  
  $stmt->bindParam(':name', $name); 
  $stmt->bindParam(':desc', $desc); 
  $stmt->bindParam(':sdate', $sdate); 
  $stmt->bindParam(':edate', $edate); 
  $stmt->bindParam(':fesdate', $fesdate); 
  $stmt->bindParam(':feedate', $feedate); 
  $stmt->bindParam(':fagency', $fagency); 
  $stmt->execute();
  $app_list = array(
              "status" => $name );

  return  $app_list;
}

function spAttachmentType_Insert($fagency,$name,$desc,$formdoc,$fext){
  $database = new Database();
  $db = $database->getConnection();


  $stmt = $db->prepare("exec spAttachmentType_Insert
    @FundingAgencyID = :fagency,
    @Name = :name,
    @Description = :desc,
    @FormDoc = :formdoc,
    @FileExtension = :fext
    ");  

  $stmt->bindParam(':fagency', $fagency); 
  $stmt->bindParam(':name', $name); 
  $stmt->bindParam(':desc', $desc); 
  $stmt->bindParam(':formdoc', $formdoc); 
  $stmt->bindParam(':fext', $fext);
  $stmt->execute();
  $app_list = array(
              "status" => $fext );
  return  $app_list;
}
function spAttachmentType_Update($id,$name,$desc,$formdoc,$fext){
  $database = new Database();
  $db = $database->getConnection();


  $stmt = $db->prepare("exec spAttachmentType_Update
    @id = :id,
    @Name = :name,
    @Description = :desc,
    @FormDoc = :formdoc,
    @FileExtension = :fext
    ");  

  $stmt->bindParam(':id', $id); 
  $stmt->bindParam(':name', $name); 
  $stmt->bindParam(':desc', $desc); 
  $stmt->bindParam(':formdoc', $formdoc); 
  $stmt->bindParam(':fext', $fext);
  $stmt->execute();
  $app_list = array(
              "status" => $id );
  return  $app_list;
}
function spCallForProposal_Select($id)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spCallForProposal_Select @FundingAgency_id = :id ");  
  
  $stmt->bindParam(':id', $id); 
  $stmt->execute();
  $app_list =[];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "name" => $row[1],
              "start" => $row[2],
              "end" => $row[3],
              "desc" => $row[4],
              "fesd" => $row[5],
              "feed" => $row[6]);
            $x++;
}
  return  $app_list;
}
function spAttachmentType_Select($id)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spAttachmentType_Select @fundingAgencyID = :id ");  
  
  $stmt->bindParam(':id', $id); 
  $stmt->execute();
  $app_list =[];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "name" => $row[1],
              "desc" => $row[2],
              "formdoc" => $row[3],
              "fext" => $row[4],
              "fagencyname" => $row[5],
              "fagencydesc" => $row[6]);
            $x++;
}
  return  $app_list;
}


function spProgramDiscipline_Update($id,$name){
  $database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProgramDiscipline_Update
    @ProgramDiscipline = :id,
    @ProgramDiscDesc = :name
    ");  


  $stmt->bindParam(':id', $id);
  $stmt->bindParam(':name', $name);
  $stmt->execute();
  $app_list = array(
              "status" => 'success' );

  return  $app_list;
}

function spAttachmentType_Delete($id){
  $database = new Database();
  $db = $database->getConnection();

  $stmt = $db->prepare("exec spAttachmentType_Delete
    @id = :id
    ");  
  $stmt->bindParam(':id', $id); 
  $stmt->execute();
  $app_list = array(
              "status" => $name );

  return  $app_list;
}

function spProgramDiscipline_Delete($id){
  $database = new Database();
  $db = $database->getConnection();

  $stmt = $db->prepare("exec spProgramDiscipline_Delete
    @ProgramDiscipline = :id
    ");  
  $stmt->bindParam(':id', $id); 
  $stmt->execute();
  $app_list = array(
              "status" => $name );

  return  $app_list;
}


function spProgramDisciplineCreate($name){
  $database = new Database();
  $db = $database->getConnection();

  $stmt = $db->prepare("exec spProgramDisciplineCreate
    @ProgramDiscDesc = :name
    ");  
  $stmt->bindParam(':name', $name); 
  $stmt->execute();
  $app_list = array(
              "status" => $name );

  return  $app_list;
}

function spProgramDiscipline_List()
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProgramDiscipline_List");  
  $stmt->execute();
  $app_list =[];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "name" => $row[1]);
            $x++;
        
}
  return  $app_list;
}

function spRPTResearch_CountByCompany2($id)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spRPTResearch_CountByCompany @company_id = '$id'");  
  $stmt->execute();
  $app_list =[];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "name" => $row[0],
              "level" => $row[1],
              "status" => $row[2],
              "count" => $row[3]);
            $x++;
        
}
  return  $app_list;
}


function spRPTResearch_CountByCompany()
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spRPTResearch_CountByCompany");  
  $stmt->execute();
  $app_list =[];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "name" => $row[0],
              "level" => $row[1],
              "status" => $row[2],
              "count" => $row[3]);
            $x++;
        
}
  return  $app_list;
}

function spCompany_Update($id,$name,$street,$psgc,$phone,$mobile,$email,$fax,$industry){
  $database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spCompany_Update
    @CompanyID = :id,
    @CompanyName = :name,
    @NoStreet = :street,
    @PSGC =:psgc,
    @PhoneNo =:phone,
    @MobileNo = :mobile,
    @EmailAdd = :email,
    @FaxNo = :fax,
    @IndustryCode = :industry
    ");  


  $stmt->bindParam(':id', $id);
  $stmt->bindParam(':name', $name);
  $stmt->bindParam(':street', $street);
  $stmt->bindParam(':psgc', $psgc);
  $stmt->bindParam(':phone', $phone);
  $stmt->bindParam(':mobile', $mobile);
  $stmt->bindParam(':email', $email);
  $stmt->bindParam(':fax', $fax);
  $stmt->bindParam(':industry', $industry);
  $stmt->execute();
  $app_list = array(
              "status" => 'success' );

  return  $app_list;
}

function spCompany_Delete($id)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spCompany_Delete
    @CompanyID = $id
    ");  
  $stmt->execute();
  $row = $stmt ->fetch();
  $app_list = array(
              "status" => null
               );

  return  $app_list;
}

function spCompany_Insert($name,$street,$psgc,$phone,$mobile,$email,$fax,$industry){
  $database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spCompany_Insert
    @CompanyName = :name,
    @NoStreet = :street,
    @PSGC =:psgc,
    @PhoneNo =:phone,
    @MobileNo = :mobile,
    @EmailAdd = :email,
    @FaxNo = :fax,
    @IndustryCode = :industry
    ");  


  $stmt->bindParam(':name', $name);
  $stmt->bindParam(':street', $street);
  $stmt->bindParam(':psgc', $psgc);
  $stmt->bindParam(':phone', $phone);
  $stmt->bindParam(':mobile', $mobile);
  $stmt->bindParam(':email', $email);
  $stmt->bindParam(':fax', $fax);
  $stmt->bindParam(':industry', $industry);
  $stmt->execute();
  $app_list = array(
              "status" => 'success' );

  return  $app_list;
}
function spIndustryCode_List()
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spIndustryCode_List");  
  $stmt->execute();
  $app_list = array(
               0 => null);
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "name" =>  $row[1]  );
            $x++;
        
}
  return  $app_list;
}

function spUser_ViewDomain_Company_Delete($id)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spUser_ViewDomain_Company_Delete @id = :id"); 
  $stmt->bindParam(':id', $id);
  $stmt->execute();
  $app_list = [];
  $x=0;
  return  $app_list;
}

function spUser_ViewDomain_Company_Insert($id,$cid)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spUser_ViewDomain_Company_Insert @CompanyID = :cid,@Role_ApplicationID = :id"); 
  $stmt->bindParam(':id', $id);
  $stmt->bindParam(':cid', $cid);
  $stmt->execute();
  $app_list = [];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list = array(
              "id" => 'success');
            $x++;
        
}
  return  $app_list;
}

function spUser_ViewDomain_Company_Select_by_Role($id)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spUser_ViewDomain_Company_Select_by_Role @Role_ApplicationID = :id"); 
  $stmt->bindParam(':id', $id);
  $stmt->execute();
  $app_list = [];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list = array(
              "id" => $row[0],
              "companyid" => $row[1]);
            $x++;
        
}
  return  $app_list;
}
function spRole_RoleApplication_Select($id)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spRole_RoleApplication_Select @RoleID = :id"); 
  $stmt->bindParam(':id', $id);
  $stmt->execute();
  $app_list = [];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list = array(
              "id" => $row[0]);
            $x++;
        
}
  return  $app_list;
}

function spUser_Update(
  $id,$email,$com){
  $database = new Database();
  $db = $database->getConnection();
  $stmt = $db->prepare("exec spUser_Update
    @userID = $id,
    @email = :email,
    @CurrentSchoolOrCompany = :com
    ");  
  $stmt->bindParam(':email', $email);
  $stmt->bindParam(':com', $com); 
  $stmt->execute();
  $app_list = array(
        'id' => null);

  return  $app_list;
}


function spUser_ChangePassword(
  $id,$oldp,$newp){
  $oldp=md5($oldp);
  $newp=md5($newp);
  $database = new Database();
  $db = $database->getConnection();
  $stmt = $db->prepare("exec spUser_ChangePassword
    @userID = $id,
    @oldpass = :oldp,
    @newpass = :newp
    ");  
  $stmt->bindParam(':oldp', $oldp);
  $stmt->bindParam(':newp', $newp); 
  $stmt->execute();
  $app_list = array(null);
  if ($row = $stmt ->fetch()) {
    $app_list = array($row[0]);
  }

  return  $app_list;
}

function spUser_PersonalInformation_InsertUpdate2(
  $id,$lname,$fname,$sex,$height,$weight,$bloodtype,$gsis,
  $pagibig,$philhealth,$tin,$agencyno){
  $database = new Database();
  $db = $database->getConnection();
  $stmt = $db->prepare("exec spUser_PersonalInformation_InsertUpdate
    @userID = $id,
    @surname = :lname,
    @firstName = :fname,
    @sex = :sex,
    @height = :height,
    @weight = :weight,
    @bloodType = :bloodtype,
    @gSISNo = :gsis,
    @pagIbigNo = :pagibig,
    @philHealthNo = :philhealth,
    @tINNo = :tin,
    @agencyEmployeeNo = :agencyno
    ");  
  $stmt->bindParam(':lname', $lname);
  $stmt->bindParam(':fname', $fname); 
  $stmt->bindParam(':sex', $sex); 
  $stmt->bindParam(':height', $weight); 
  $stmt->bindParam(':weight', $weight); 
  $stmt->bindParam(':bloodtype', $bloodtype); 
  $stmt->bindParam(':gsis', $gsis); 
  $stmt->bindParam(':pagibig', $pagibig); 
  $stmt->bindParam(':philhealth', $philhealth); 
  $stmt->bindParam(':tin', $tin); 
  $stmt->bindParam(':agencyno', $agencyno); 
  $stmt->execute();
  $app_list = array(
              "id" => null);
  if ($row = $stmt ->fetch()) {
    $app_list = array(
              "id" => $row[0]);
  }

  return  $app_list;
}

function spUser_Select($email)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spUser_Select @userName = :email"); 
  $stmt->bindParam(':email', $email);
  $stmt->execute();
  $app_list = [];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list = array(
              "id" => $row[0],
              "email" => $row[1],
              "company" => $row[2],
              "chash" => $row[3],
              "emailc" => $row[4],
              "lockedout" => $row[5],
              "photo" => $row[6],
              "companyname" => $row[9]);
            $x++;
        
}
  return  $app_list;
}


function spUser_PersonalInformation_InsertUpdate(
  $id,$lname,$fname,$mname,$sname,
  $sex,$civilstatus,$citizenship,$resistreet,$resi,$permastreet,$perma,$telno,$mobileno){
  $database = new Database();
  $db = $database->getConnection();
  $stmt = $db->prepare("exec spUser_PersonalInformation_InsertUpdate
    @userID = $id,
    @surname = :lname,
    @firstName = :fname,
    @middleName = :mname,
    @nameExtension =:sname,
    @sex = :sex,
    @civilStatus = :civilstatus,
    @citizenship = :citizenship,
    @residentialAddressStreet = :resistreet,
    @residentialPSGC = :resi,
    @permanentAddressStreet = :permastreet,
    @permanetAddressPSGC = :perma,
    @telNo = :telno,
    @mobileNo = :mobileno
    ");  
  $stmt->bindParam(':lname', $lname);
  $stmt->bindParam(':fname', $fname); 
  $stmt->bindParam(':mname', $mname); 
  $stmt->bindParam(':sname', $sname); 
  $stmt->bindParam(':sex', $sex); 
  $stmt->bindParam(':civilstatus', $civilstatus); 
  $stmt->bindParam(':citizenship', $citizenship); 
  $stmt->bindParam(':resistreet', $resistreet); 
  $stmt->bindParam(':resi', $resi); 
  $stmt->bindParam(':permastreet', $permastreet); 
  $stmt->bindParam(':perma', $perma); 
  $stmt->bindParam(':telno', $telno); 
  $stmt->bindParam(':mobileno', $mobileno); 
  $stmt->execute();
  $app_list = array(
              "id" => null);
  if ($row = $stmt ->fetch()) {
    $app_list = array(
              "id" => $row[0]);
  }

  return  $app_list;
}

function spUser_Insert($email,$password,$company){
  $database = new Database();
  $db = $database->getConnection();
  $c=generateRandomString();
  $password = md5($password);
  $stmt = $db->prepare("exec spUser_Insert
    @email = :email,
    @passwordHash = :password,
    @ConfirmationCodeHash = $c,
    @CurrentSchoolOrCompany = :company
    ");  
  $stmt->bindParam(':email', $email);
  $stmt->bindParam(':password', $password); 
  $stmt->bindParam(':company', $company); 
  $stmt->execute();
  $app_list = array(
              "id" => null);
  if ($row = $stmt ->fetch()) {
    $app_list = array(
              "id" => $row[0]);
  }

  return  $app_list;
}
function spPSGC_Select($province,$town)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spPSGC_Select @province = :province, @town = :town"); 
  $stmt->bindParam(':province', $province);
  $stmt->bindParam(':town', $town); 
  $stmt->execute();
  $app_list = [];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "psgc" => $row[0],
              "towncity" => $row[1],
              "barangay" => $row[2],
              "province" => $row[3],
              "zip" => $row[4]);
            $x++;
        
}
  return  $app_list;
}
function spPSGC_Select2($psgc)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spPSGC_Select @psgc = :psgc"); 
  $stmt->bindParam(':psgc', $psgc);
  $stmt->execute();
  $app_list = [];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "psgc" => $row[0],
              "towncity" => $row[1],
              "barangay" => $row[2],
              "zip" => $row[4]);
            $x++;
        
}
  return  $app_list;
}

function spTown_Select($province)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spTown_Select @province = :province"); 
  $stmt->bindParam(':province', $province); 
  $stmt->execute();
  $app_list = [];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "towncity" => $row[0]);
            $x++;
        
}
  return  $app_list;
}

function spProvince_Select()
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProvince_Select");  
  $stmt->execute();
  $app_list = [];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "province" => $row[0]);
            $x++;
        
}
  return  $app_list;
}


function spUser_Role_Delete($id)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spUser_Role_Delete
    @userID = '$id'
    ");  
  $stmt->execute();
  $app_list = array(
              "ok" =>null
               );
  return  $app_list;
}

function spUser_Role_Insert($role,$user)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spUser_Role_Insert
    @roleID = :role,
    @userID = :user
    ");  

  $stmt->bindParam(':role', $role);
  $stmt->bindParam(':user', $user);

  $stmt->execute();
  $app_list = array(
              "status" => 'success' );

  return  $app_list;
}

function spUser_Role_List($id)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spUser_Role_List
    @userID = :id");  
  $stmt->bindParam(':id', $id);
  $stmt->execute();
  $app_list =[];
  $x=0;
  while($row = $stmt ->fetch()){
    array_push($app_list,$row[2]);
    $x++;
  }
  return  $app_list;
}
function spUser_PersonalInformation_Get($email)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spUser_PersonalInformation_Get
    @userName = :email");  
  $stmt->bindParam(':email', $email);
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $row = $stmt ->fetch();
    $app_list = array(
              "id" => $row[0],
              "lname" => $row[1],
              "fname" => $row[2],
              "mname" => $row[3],
              "ext" => $row[4],
              "birthdate" => $row[5],
              "placeofbirth" => $row[6],
              "sex" => $row[7],
              "civilstatus" => $row[8],
              "height" => $row[9],
              "weight" => $row[10],
              "bloodtype" => $row[11],
              "GSISno" => $row[12],
              "pagibigno" => $row[13],
              "philhealthno" => $row[14],
              "tinno" => $row[15],
              "agencyemloyeeno" => $row[16],
              "citizenship" => $row[17],
              "residentialaddress" => $row[18],
              "permanentaddressstreet" => $row[19],
              "permanentaddresspsgc" => $row[20],
              "telno" => $row[21],
              "mobileno" => $row[22]

              );
  return  $app_list;
}

function spUserAccessLevel_By_Username($username)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spUserAccessLevel_By_Username @username=:username"); 
  $stmt->bindParam(':username', $username); 
  $stmt->execute();
  $app_list = [];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "roleid" => $row[0],
              "rolename" =>  $row[1],
              "appname" =>  $row[2],
              "moduleid" =>  $row[3],
              "modulename" =>  $row[4]);
            $x++;
        
}
  return  $app_list;
}

function spRoleRight_List($id)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spRoleRight_List @roleID = $id");  
  $stmt->execute();
  $app_list = [];
  $x=0;
while ($row = $stmt ->fetch()) {
    array_push($app_list,$row[2]);
        
}
  return  $app_list;
}
function spRoleRight_Delete($id)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spRoleRight_Delete
    @Role_id = $id
    ");  
  $stmt->execute();
  $app_list = array(
              "ok" =>null
               );
  return  $app_list;
}

function spRoleRight_Insert($role,$app)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spRoleRight_Insert
    @roleID = :role,
    @applicationModuleID = :app
    ");  

  $stmt->bindParam(':role', $role);
  $stmt->bindParam(':app', $app);

  $stmt->execute();
  $app_list = array(
              "status" => 'success' );

  return  $app_list;
}

function spApplication_Module_List()
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spApplication_Module_List @ApplicationID=1");  
  $stmt->execute();
  $app_list = [];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "name" =>  $row[1]);
            $x++;
        
}
  return  $app_list;
}

function spRole_Update($role,$desc,$id)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spRole_Update
    @name = :role,
    @description = :desc,
    @id = $id
    ");  

  $stmt->bindParam(':role', $role);
  $stmt->bindParam(':desc', $desc);

  $stmt->execute();
  $app_list = array(
              "status" => 'success' );

  return  $app_list;
}
function spRole_Delete($id)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spRole_Delete
    @id = $id
    ");  
  $stmt->execute();
  $app_list = array(
              "ok" =>null
               );
  return  $app_list;
}

function spRole_Insert($role,$desc)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spRole_Insert
    @name = :role,
    @description = :desc
    ");  

  $stmt->bindParam(':role', $role);
  $stmt->bindParam(':desc', $desc);

  $stmt->execute();
  $app_list = array(
              "status" => 'success' );

  return  $app_list;
}
function spRole_List()
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spRole_List");  
  $stmt->execute();
  $app_list = [];
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "name" =>  $row[1],
              "desc" =>  $row[2]);
            $x++;
        
}
  return  $app_list;
}
function spResearchStatus_List()
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchStatus_List");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "name" =>  $row[1]);
            $x++;
        
}
  return  $app_list;
}


function researchdelete($id)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearch_Delete
    @id = $id
    ");  
  $stmt->execute();
  $app_list = array(
              "ok" =>null
               );
  return  $app_list;
}

function spResearchPublicationDetails_Insert($rid,$title,$volume,$issue,$year,$publisher,$page,$place)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchPublicationDetails_Insert
    @Research_id = $rid,
    @title = :title,
    @volume = :volume,
    @issue = :issue,
    @year = :year,
    @publisher = :publisher,
    @page = :page,
    @placeOfPublication = :place
    ");  
  $stmt->bindParam(':title', $title);
  $stmt->bindParam(':volume', $volume);
  $stmt->bindParam(':issue', $issue);
  $stmt->bindParam(':year', $year);
  $stmt->bindParam(':publisher', $publisher);
  $stmt->bindParam(':page', $page);
  $stmt->bindParam(':place', $place);
  $stmt->execute();
  $app_list = array(
              "status" => 'success' );

  return  $app_list;
}

function spResearchPublicationDetails_Select($rid)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchPublicationDetails_Select
    @Research_id = $rid");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;

while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "researchid" => $row[1],
              "title" => $row[2],
              "volume" => $row[3],
              "issue" => $row[4],
              "year" => $row[5],
              "publisher" => $row[6]
              );
            $x++;
        
}
  return  $app_list;
}

function spResearchPublicationDetails_Delete($id)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchPublicationDetails_Delete
    @id = $id
    ");  
  $stmt->execute();
  $app_list = array(
              "ok" =>null
               );
  return  $app_list;
}


function spAuthor_Delete($id)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spAuthor_Delete
    @id = $id
    ");  
  $stmt->execute();
  $row = $stmt ->fetch();
  $app_list = array(
              "status" =>$row[0]
               );

  return  $app_list;
}

function spAuthor_Insert($fname,$mname,$lname,$sname,$cid){
  $database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spAuthor_Insert
   @FirstName = :fname,
   @MiddleName = :mname,
    @Surname =:lname,
    @NameExtension =:sname,
    @companyID = '$cid'
    ");  


  $stmt->bindParam(':fname', $fname);
  $stmt->bindParam(':mname', $mname);
  $stmt->bindParam(':lname', $lname);
  $stmt->bindParam(':sname', $sname);
  $stmt->execute();
  $app_list = array(
              "status" => 'success' );

  return  $app_list;
}

function spResearchResearchStatus_Insert($rid,$remarks,$status){
  $database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchResearchStatus_Insert
    @Research_id = :rid,
    @Remarks = :remarks,
    @researchStatus_id = :status
    ");  
  $stmt->bindParam(':rid', $rid);
  $stmt->bindParam(':remarks', $remarks);
  $stmt->bindParam(':status', $status);
  $stmt->execute();
  $app_list = array(
              "status" => 'success2' );

  return  $app_list;
}

function spResearchDocument_Insert($rid,$name,$doc,$type,$status)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchDocument_Insert
    @Research_id = $rid,
    @name = '$name',
    @document = '$doc',
    @type = '$type',
    @documentStatus_id = '$status'
    ");  
  $stmt->execute();
  $app_list = array(
              "status" => 'success' );

  return  $app_list;
}

function spResearchDocument_Select($rid,$type)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchDocument_Select
    @Research_id = $rid,
    @type = $type");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;

while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "researchid" => $row[1],
              "name" => $row[2],
              "value" => $row[3],
              "dateuploaded" => $row[4],
              "type" => $row[5],
              "statusid" => $row[6]
              );
            $x++;
        
}
  return  $app_list;
}

function spResearchDocument_Delete($id)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchDocument_Delete
    @id = $id
    ");  
  $stmt->execute();
  $app_list = array(
              "ok" =>null
               );
  return  $app_list;
}


function spResearchFundingAgency_Delete($id)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchFundingAgency_Delete
    @id = $id
    ");  
  $stmt->execute();
  $app_list = array(
              "ok" =>null
               );
  return  $app_list;
}
function spResearchFundingAgency_Select($id)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchFundingAgency_Select
    @Research_id = $id");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;

while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "name" => $row[1]
              );
            $x++;
        
}
  return  $app_list;
}
function spResearchFundingAgency_Insert_Update($rid,$did)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchFundingAgency_Insert_Update
    @Research_id = $rid,
    @SourceOfFund = :did
    ");  
  $stmt->bindParam(':did', $did);
  $stmt->execute();
  $app_list = array(
              "status" => "success" );

  return  $app_list;
}



function spResearchProgramDiscipline_Delete($id)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchProgramDiscipline_Delete
    @id = $id");  
  $stmt->execute();
  $app_list = array(
              "ok" =>null
               );
  return  $app_list;
}
function spResearchProgramDiscipline_Select($id)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchProgramDiscipline_Select
    @Research_id = $id");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;

while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "rid" => $row[1],
              "did" => $row[2],
              "desc" => $row[3]
              );
            $x++;
        
}
  return  $app_list;
}
function spResearchProgramDiscipline_Insert_Update($rid,$did)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchProgramDiscipline_Insert_Update
    @Research_id = $rid,
    @ProgramDiscipline = '$did'
    ");  
  $stmt->execute();
  $app_list = array(
              "status" => "success" );

  return  $app_list;
}

function spFundingAgency_Select_NotIn($rid)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spFundingAgency_Select_NotIn
   @Research_id= $rid");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "name" =>  $row[1],
              "desc" =>  $row[2]);
            $x++;
        
}
  return  $app_list;
}



function spProgramDiscipline_Select_NotIn($rid)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProgramDiscipline_Select_NotIn
    @ResearchId= $rid");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "desc" =>  $row[1]);
            $x++;
        
}
  return  $app_list;
}


function spResearchKeyword_Delete($id)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchKeyword_Delete
    @id = $id");  
  $stmt->execute();
  $app_list = array(
              "ok" =>$id
               );
  return  $app_list;
}
function spResearchKeyword_Select($id)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchKeyword_Select
    @Research_id = $id");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;

while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" =>  $row[0],
              "keyword" => $row[1]
              );
            $x++;
        
}
  return  $app_list;
}
function spResearchKeyword_Insert($rid,$kw)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchKeyword_Insert
    @Research_id = $rid,
    @Keyword = :kw
    ");  


  $stmt->bindParam(':kw', $kw);
  $stmt->execute();
  $app_list = array(
              "status" => "success" );

  return  $app_list;
}





function spAuthor_listnot($cid,$rid)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spAuthor_list_NotIn
     @CompanyID = '$cid',
     @Research_id = '$rid'");  
  $stmt->execute();
  $app_list = array();
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "name" =>  $row[1] ,
              "authorid" =>  $row[2] ,
              "email" =>  $row[3]  );
            $x++;
        
}
  return  $app_list;
}
function spUserViewDomain_Company_By_Username($email)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spUserViewDomain_Company_By_Username
    @username = '$email'");  
  $stmt->execute();
  $app_list = array(
              "companyid" => 'none');
  $app_list = array(
               0 => $app_list);
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "roleid" => $row[0],
              "name" =>  $row[1] ,
              "appname" =>  $row[2] ,
              "companyid" =>  $row[3],
              "companyname" =>  $row[4]  );
            $x++;
        
}
  return  $app_list;
}

function spResearchAuthorDelete($aid,$rid)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchAuthorDelete
    @Research_id = $rid,
    @authorid= $aid");  
  $stmt->execute();
  $app_list = array(
              "ok" =>$aid
               );
  return  $app_list;
}
function spResearchAuthor_Select($id)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchAuthor_Select
    @Research_id = $id");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "rid" => $row[0],
              "id" => $row[1],
              "name" =>  $row[2]." ".$row[3].' '. $row[4].' '. $row[5] ,
              "userid" =>  $row[6] ,
              "email" =>  $row[7]  );
            $x++;
        
}
  return  $app_list;
}
function spResearchAuthor_Insert_Update($rid,$aid)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchAuthor_Insert_Update
    @Research_id = $rid,
    @Author_id = $aid
    ");  
  $stmt->execute();
  $app_list = array(
              "status" => "success" );

  return  $app_list;
}




function spResearch_List($x,$y)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();
if ($x=='null') {
  $stmt = $db->prepare("exec spResearch_List @status_id = $y");  
}else
  $stmt = $db->prepare("exec spResearch_List @CompanyID = '$x',@status_id = $y");  
  $stmt->execute();
  $app_list =[];
  $x=0;


  while ($row = $stmt ->fetch()) {
    $rid=$row[0];
    $stmt2 = $db->prepare("exec spResearchResearchStatus_Select @Research_id = '$rid'");  
    $stmt2->execute();
    $y=0;
    while ($row2 = $stmt2 ->fetch()) {

    if($row2[4]=="null")
      $rem = null;
    else
      $rem = $row2[4];
    
       $app_list2[$y] = array(
                  "id" => $row2[0],
                  "researchid" =>  $row2[1],
                  "statusid" =>  $row2[2],
                  "status" =>  $row2[3],
                  "remarks" =>  $rem,
                  "datecreated" =>  $row2[5],
                  "dateUpdate" =>  $row2[6] );
                $y++;
    }
      $app_list[$x] = array(
                "id" => $row[0],
                "title" =>  $row[1],
                "dlid" =>  $row[3],
                "level" =>  $row[4],
                "company" =>  $row[5],
                "datecreated" =>  $row[6],
                "abstract" =>  $row[2],
                "status" =>  $app_list2 );
              $x++;
  }
  return  $app_list;
}

function spProposal_ProjectProponent_Delete($id)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProjectProponent_Delete
    @id = $id");  
  $stmt->execute();
  $app_list = array(
              "ok" =>"ok"
               );
  return  $app_list;
}
function spProposal_ProjectProponent_List($projectid)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProjectProponent_List
    @Project_id = $projectid");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "fname" =>  $row[1],
              "mname" =>  $row[2],
              "lname" =>  $row[3],
              "sname" =>  $row[4],
              "percent" =>  $row[5],
              "userid" =>  $row[6],
              "type" =>  $row[7] );
            $x++;
        
}
  return  $app_list;
}
function spProposal_ProjectProponent_Insert($pid,$fname,$lname,$mname,$sname,$percent,$type)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProjectProponent_Insert
    @Project_id = $pid,
    @fName = '$fname',
    @lName = '$lname',
    @mName = '$mname',
    @sName = '$sname',
    @percentTimeDevoted = $percent,
    @ProponentType_id = $type

    ");  
  $stmt->execute();
  $app_list = array(
              "status" => "success" );

  return  $app_list;
}






function researchadd($title,$abstract,$company,$degreelevel,$user)
{

  $database = new Database();
  $db = $database->getConnection();

  $stmt = $db->prepare("exec spResearch_Insert
    @Title = :title,
    @Abstract = :abstract,
    @DegreeLevel_id = '$degreelevel',
    @CompanyID = '$company',
    @CreatedBy = '$user'");  
  $stmt->bindParam(':title', $title);
  $stmt->bindParam(':abstract', $abstract);
  $stmt->execute();
   $row = $stmt ->fetch();
  $app_list = array(
              "id" => $row[0] );
  return  $app_list;
}
function researchedit($id,$title,$abstract,$company,$degreelevel,$user)
{
  $database = new Database();
  $db = $database->getConnection();

  $stmt = $db->prepare("exec spResearch_Update
    @ID = $id,
    @Title = :title,
    @Abstract = :abstract,
    @DegreeLevel_id = '$degreelevel',
    @CompanyID = '$company',
    @UpdatedBy = $user");  
  $stmt->bindParam(':title', $title);
  $stmt->bindParam(':abstract', $abstract);
  $stmt->execute();
  $app_list = array(
              "id" => $user);
  return  $app_list;
}

function degreelevel()
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spDegreeLevel_List");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "name" =>  $row[1],
              "description" =>  $row[2]);
            $x++;
        
}
  return  $app_list;
}
function statuschange($proposalid,$statusid,$remarks,$userid,$type)
{
  $database = new Database();
  $db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_Status_Insert
    @Proposal_id = $proposalid,
    @StatusID = $statusid,
    @Remarks = :remarks,
    @UserId = $userid,
    @Type = $type");  
  $stmt->bindParam(':remarks', $remarks); 
  $stmt->execute();
  $app_list = array(
              "ok" =>"ok"
               );
  return  $app_list;
}


function spProposal_ProjectSector_Insert_Update($pid,$cid)
{
  $database = new Database();
  $db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProjectSector_Insert_Update
    @Project_id = $pid,
    @ProjectSector_id = $cid");  
  $stmt->execute();
  $app_list = array(
              "ok" =>"ok"
               );
  return  $app_list;
}
function spProposal_ProjectMOI_Insert_Update($pid,$cid)
{
  $database = new Database();
  $db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProjectMOI_Insert_Update
    @Project_id = $pid,
    @MOI_ID = $cid");  
  $stmt->execute();
  $app_list = array(
              "ok" =>"ok"
               );
  return  $app_list;
}
function spProposal_ProjectPriorityAgenda_Insert_Update($pid,$cid)
{
  $database = new Database();
  $db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProjectPriorityAgenda_Insert_Update
    @Project_id = $pid,
    @PriorityAgenda_id = $cid");  
  $stmt->execute();
  $app_list = array(
              "ok" =>"ok"
               );
  return  $app_list;
}
function projectclassificationupdate($pid,$cid)
{
  $database = new Database();
  $db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProjectClassification_Insert_Update
    @Project_id = $pid,
    @ProjectClassification_id = $cid");  
  $stmt->execute();
  $app_list = array(
              "ok" =>"ok"
               );
  return  $app_list;
}
function spProposal_ProjectDiscipline_Insert_Update($pid,$cid)
{
  $database = new Database();
  $db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProjectDiscipline_Insert_Update
    @Project_id = $pid,
    @ProjectDiscipline_id = $cid");  
  $stmt->execute();
  $app_list = array(
              "ok" =>"ok"
               );
  return  $app_list;
}
function projectinsert($id,$title,$duration,$rndstation,$siteofi,$significance,$objectives,$literature,$sbasis,$methodology,$majora,$expectedoutput,$targetb,$start,$completion){

 $database = new Database();
  $db = $database->getConnection();

  $title=htmlspecialchars(strip_tags($title));
  $duration=htmlspecialchars(strip_tags($duration));
  $rndstation=htmlspecialchars(strip_tags($rndstation));
  $siteofi=htmlspecialchars(strip_tags($siteofi));
  $significance=htmlspecialchars(strip_tags($significance));
  $objectives=htmlspecialchars(strip_tags($objectives));
  $literature=htmlspecialchars(strip_tags($literature));
  $sbasis=htmlspecialchars(strip_tags($sbasis));
  $majora=addslashes($majora);
  $methodology=htmlspecialchars(strip_tags($methodology));
  $expectedoutput=htmlspecialchars(strip_tags($expectedoutput));
  $targetb=htmlspecialchars(strip_tags($targetb));

  //    @SiteOfImplementation_PSGC = '$Address_PSGC',

  $stmt = $db->prepare("exec spProposal_Project_Update
    @id = $id,
    @ProjectTitle = :title,
    @Duration = :duration,
    @RAndDStation = :rndstation,
    @Significance = :significance,
    @Objectives = :objectives,
    @ReviewOfLiterature = :literature,
    @ScientificBasis = :sbasis,
    @Methodology = :methodology,
    @ExpectedOutput = :expectedoutput,
    @TargetBeneficiaries = :targetb,
    @WorkPlan_attachment = :majora,
    @PlannedStartDate = '$start',
    @PlannedCompletionDate = '$completion'");
  $stmt->bindParam(':majora', $majora);  
  $stmt->bindParam(':title', $title); 
  $stmt->bindParam(':rndstation', $rndstation); 
  $stmt->bindParam(':significance', $significance); 
  $stmt->bindParam(':objectives', $objectives); 
  $stmt->bindParam(':literature', $literature); 
  $stmt->bindParam(':methodology', $methodology); 
  $stmt->bindParam(':expectedoutput', $expectedoutput); 
  $stmt->bindParam(':targetb', $targetb); 
  $stmt->bindParam(':sbasis', $sbasis); 
  $stmt->execute();
  $proposalid = $stmt ->fetch();
  $app_list = array(
              "id" => $id );
    

  return  $app_list;
}

function projectdeletecoopagency($id)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProjectCooperatingAgencies_Delete
    @id = $id");  
  $stmt->execute();
  $app_list = array(
              "ok" =>"ok"
               );
  return  $app_list;
}
function getcoopagency($projectid)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProjectCooperatingAgency_List
    @Project_id = $projectid");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "name" =>  $row[1]  );
            $x++;
        
}
  return  $app_list;
}
function projectaddcoopagency($pid,$cid)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProjectCooperatingAgency_Insert_Update
    @Project_id = $pid,@companyID = '$cid'");  
  $stmt->execute();
  $app_list = array(
              "status" => "success" );

  return  $app_list;
}

function insertProposal($GeneralTitle,$LeadAgency,$Street,$Address_PSGC,$Telephone,$Fax,$Email,$FundingAgency_id,$TotalDuration,$createdBy)
{
$database = new Database();
$db = $database->getConnection();

  $GeneralTitle=htmlspecialchars(strip_tags($GeneralTitle));
  $LeadAgency=htmlspecialchars(strip_tags($LeadAgency));
  $Street=htmlspecialchars(strip_tags($Street));
  $Address_PSGC=htmlspecialchars(strip_tags($Address_PSGC));
  $Telephone=htmlspecialchars(strip_tags($Telephone));
  $Fax=htmlspecialchars(strip_tags($Fax));
  $Email=htmlspecialchars(strip_tags($Email));

  $stmt = $db->prepare("exec spProposal_Insert
    @GeneralTitle = :GeneralTitle,
    @LeadAgency = :LeadAgency,
    @Street = :Street,
    @Address_PSGC = :Address_PSGC,
    @Telephone = :Telephone,
    @Fax = :Fax,
    @Email = :Email,
    @FundingAgency_id = $FundingAgency_id,
    @TotalDuration = $TotalDuration,
    @createdBy = $createdBy");   
  $stmt->bindParam(':Fax', $Fax); 
  $stmt->bindParam(':Email', $Email); 
  $stmt->bindParam(':Telephone', $Telephone); 
  $stmt->bindParam(':Address_PSGC', $Address_PSGC); 
  $stmt->bindParam(':Street', $Street); 
  $stmt->bindParam(':LeadAgency', $LeadAgency); 
  $stmt->bindParam(':GeneralTitle', $GeneralTitle); 
  $stmt->execute();
  $proposalid = $stmt ->fetch();
  $app_list = array("id" => $proposalid[0]);
  return  $app_list;
}


function programinsert($proposalid)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_Program_Insert_Update
    @ProposalID = '$proposalid'");  
  $stmt->execute();
  $proposalid = $stmt ->fetch();
  $app_list = array(
              "id" => $proposalid[0] );
    

  return  $app_list;
}
function projectadd($programid,$title,$duration)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_Project_Insert
    @Program_id = '$programid',@ProjectTitle = :title,@Duration = $duration");  
  $stmt->bindParam(':title', $title);    
  $stmt->execute();
  $app_list = array(
              "status" => "success" );

  return  $app_list;
}

function proposallists($userid)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_List
    @UserID = :userid");  
  $stmt->bindParam(':userid', $userid);  
  $stmt->execute();
  
  $x=0;
$app_list=[];
while ($proposal = $stmt ->fetch()) {
  
$ents=$proposal[0];
   $stmt2 = $db->prepare("exec spProposal_Status_List
    @Proposal_id = $ents");  
  $stmt2->execute();
  $y=0;
  while ($status = $stmt2 ->fetch()) {
     $stat[$y] = array(
                "id" => $status[0],
                "name" => $status[1],
                "remarks" => $status[2],
                "createdby" => $status[3],
                "datecreated" => $status[4],
                "updatedby" => $status[5],
                "dateupdated" => $status[6],
                "type" => $status[7]
                 );
     $y++;
  }
   $app_list[$x] = array(
              "id" => $proposal[0],
              "GeneralTitle" => $proposal[1],
              "Coordinator" => $proposal[2],
              "Agency" => $proposal[3],
              "Address" => $proposal[4],
              "Telephone" => $proposal[5],
              "Fax" => $proposal[6],
              "Email" => $proposal[7],
              "FundingAgency" => $proposal[8],
              "status" => $stat,
              "datecreated" => $proposal[9]
               );
   

   $x++;
}
  return  $app_list;
}

function proposallistsall()
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_List");  
  $stmt->execute();
  
  $x=0;
$app_list=[];
while ($proposal = $stmt ->fetch()) {
  
$ents=$proposal[0];
   $stmt2 = $db->prepare("exec spProposal_Status_List
    @Proposal_id = $ents");  
  $stmt2->execute();
  $y=0;
  while ($status = $stmt2 ->fetch()) {
     $stat[$y] = array(
                "id" => $status[0],
                "name" => $status[1],
                "remarks" => $status[2],
                "createdby" => $status[3],
                "datecreated" => $status[4],
                "updatedby" => $status[5],
                "dateupdated" => $status[6],
                "type" => $status[7]
                 );
     $y++;
  }
   $app_list[$x] = array(
              "id" => $proposal[0],
              "GeneralTitle" => $proposal[1],
              "Coordinator" => $proposal[2],
              "Agency" => $proposal[3],
              "Address" => $proposal[4],
              "Telephone" => $proposal[5],
              "Fax" => $proposal[6],
              "Email" => $proposal[7],
              "FundingAgency" => $proposal[8],
              "status" => $stat,
              "datecreated" => $proposal[9]
               );
   

   $x++;
}
  return  $app_list;
}

 
function proposaldelete($proposalid)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_Delete
    @id = $proposalid");  
  $stmt->execute();
  $app_list = array(
              "ok" =>"ok"
               );
  return  $app_list;
}

function addbudget($pid,$s,$ps,$moe,$co)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProgramBudgetSummary_Insert
    @Program_id = $pid,@SourceOfFund = '$s',@PS = $ps,@MOE = $moe,@CO = $co");  
  $stmt->execute();
  $app_list = array(
              "ok" =>"ok"
               );
  return  $app_list;
}
 
function addbudget2($pid,$s,$ps,$moe,$co)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProjectEstimatedBudget_Insert
    @Project_id = $pid,@SourceName = '$s',@PS = $ps,@MOE = $moe,@CO = $co");  
  $stmt->execute();
  $app_list = array(
              "ok" =>$ps
               );
  return  $app_list;
}
function removeprojecttitle($projectid)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_Project_Delete
    @id = $projectid");  
  $stmt->execute();
  $app_list = array(
              "ok" =>"ok"
               );
  return  $app_list;
}

function removebudget($id)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProgramBudgetSummary_Delete
    @id = $id");  
  $stmt->execute();
  $app_list = array(
              "ok" =>"ok"
               );
  return  $app_list;
}
function removebudget2($id)
{
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProjectEstimatedBudget_Delete
    @id = $id");  
  $stmt->execute();
  $app_list = array(
              "ok" =>"ok"
               );
  return  $app_list;
}

function proposaldone($esum,$proposalid)
{
  $esum=htmlspecialchars(strip_tags($esum));
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_Program_Insert_Update
    @ProposalID = '$proposalid',@Significance = :esum");
  $stmt->bindParam(':esum', $esum);   
  $stmt->execute();
  $app_list = array(
              "ok" =>"ok"
               );
  return  $app_list;
}

function FundingAgency_List()
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spFundingAgency_List");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "name" =>  $row[1],
              "desciption" =>  $row[2]);
            $x++;
        
}
  return  $app_list;
}

function company_List()
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spCompany_List");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "name" =>  $row[1],
              "address" => $row[2],
              "phone" =>  $row[3],
              "mobile" =>  $row[4],
              "email" =>  $row[5],
              "fax" =>  $row[6],
              "industry" =>  $row[7],
              "street" =>  $row[8],
              "industryname" =>  $row[9],
              "psgc" =>  $row[10]);
            $x++;
        
}
  return  $app_list;
}
function getprojecttitles($programid)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_Project_List
    @Program_id = $programid");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "ptitle" =>  $row[1],
              "duration" =>  $row[2],
              "pdstation" =>  $row[3],
              "siteoi" =>  $row[4], 
              "significance" => $row[5], 
              "objectives" => $row[8], 
              "revlit" => $row[11], 
              "sbasis" =>  $row[14], 
              "methodology" =>  $row[17] , 
              "eoutput" =>  $row[20],
              "targetb" =>  $row[23]  );
            $x++;
        
}
  return  $app_list;
}
function getbudget($programid)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProgramBudgetSummary_List
    @Program_id = $programid");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "pid" =>  $row[1],
              "sof" =>  $row[2],
              "ps" =>  $row[3],
              "moe" =>  $row[4], 
              "co" => $row[5]);
            $x++;
        
}
  return  $app_list;
}
function getbudget2($projectid)
{
  //normally this info would be pulled from a database.
  //build JSON array
$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spProposal_ProjectEstimatedBudget_List
    @Project_id = $projectid");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;
while ($row = $stmt ->fetch()) {
    $app_list[$x] = array(
              "id" => $row[0],
              "pid" =>  $row[1],
              "sof" =>  $row[2],
              "ps" =>  $row[3],
              "moe" =>  $row[4], 
              "co" => $row[5]);
            $x++;
        
}
  return  $app_list;
}
function login($uname,$pword,$appname,$appsecret)
{
  //normally this info would be pulled from a database.
  //build JSON array

  $uname=htmlspecialchars(strip_tags($uname));
  $pword = md5($pword);
  $appsecret = md5($appsecret);

  $database = new Database();
  $db = $database->getConnection();

  $stmt = $db->prepare("exec spUser_Login
    @username = :uname,
    @password = :pword,
    @applicationName = '$appname',
    @appSecret = '$appsecret'");

  $stmt->bindParam(':pword', $pword);  
  $stmt->bindParam(':uname', $uname);  
  $stmt->execute();
  if ($row = $stmt ->fetch()) {
    $app_list = array(
              "id" => null);
    
    $app_list = array(
              "id" => $row[0],
              "email" =>  $row[1],
              "confirmed" =>  $row[2],
              "lockout" =>  $row[3],
              "codehash" =>  $row[4], 
              "dateregistered" => $row[5], 
              "photo" => $row[6]);
  }else{
    $app_list = array(
              "id" => null);
  }
  

  return  $app_list;
}
function getuserinfo($id)
{
  $database = new Database();
  $db = $database->getConnection();

  $stmt = $db->prepare("exec spUser_PersonalInformation_Get
    @userID = $id");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
    $row = $stmt ->fetch();
    $app_list = array(
              "id" => $row[0],
              "surname" =>  $row[1],
              "fname" =>  $row[2],
              "mname" =>  $row[3],
              "ext" =>  $row[4], 
              "birthdate" => $row[5], 
              "birthplace" => $row[6], 
              "sex" => $row[7], 
              "civilstatus" => $row[8], 
              "height" => $row[9], 
              "weight" => $row[10], 
              "bloodtype" => $row[11], 
              "gsis" => $row[12], 
              "pagibig" => $row[13], 
              "philhealth" => $row[14], 
              "tin" => $row[15], 
              "agencyno" => $row[16], 
              "citizenship" => $row[17], 
              "street1" => $row[18], 
              "psgc1" => $row[19], 
              "street2" => $row[20], 
              "psgc2" => $row[21], 
              "telno" => $row[22], 
              "mobileno" => $row[23]);

  return  $app_list;
}


function generateRandomString($length = 20) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

 ?>