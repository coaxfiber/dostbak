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



include_once 'config/database.php';
include_once 'functions.php';


$possible_url = array(
  "proposalinsert",
  "proposallists", 
  "proposaldelete", 
  'programinsert', 
  'getprojecttitles',
  'projectadd',
  'removeprojecttitle',
  'removebudget',
  'removebudget2',
  'FundingAgency_List',
  'addbudget',
  'getbudget',
  'addbudget2',
  'getbudget2',
  'proposaldone',
  'login',
  'getuserinfo',
  'projectinsert',
  'company_List',
  'projectaddcoopagency',
  'getcoopagency',
  'projectdeletecoopagency',
  'projectclassificationupdate',
  'spProposal_ProjectDiscipline_Insert_Update',
  'spProposal_ProjectPriorityAgenda_Insert_Update',
  'spProposal_ProjectMOI_Insert_Update',
  'spProposal_ProjectSector_Insert_Update',
  'statuschange',
  'degreelevel',
  'researchadd',
  'researchedit',
  'spProposal_ProjectProponent_Insert',
  'spProposal_ProjectProponent_Delete',
  'spProposal_ProjectProponent_List',
  'spResearch_List',
  'spResearch_Liststatus',
  'spResearchAuthor_Insert_Update',
  'spResearchAuthorDelete',
  'spResearchAuthor_Select',
  'spUserViewDomain_Company_By_Username',
  'spAuthor_listnot',
  'spResearchKeyword_Insert',
  'spResearchKeyword_Select',
  'spResearchKeyword_Delete',
  'spProgramDiscipline_Select_NotIn',
  'spResearchProgramDiscipline_Insert_Update',
  'spResearchProgramDiscipline_Select',
  'spResearchProgramDiscipline_Delete',
  'spResearchFundingAgency_Insert_Update',
  'spResearchFundingAgency_Select',
  'spResearchFundingAgency_Delete',
  'spResearchDocument_Insert',
  'spResearchDocument_Select',
  'spResearchDocument_Delete',
  'spResearchPublicationDetails_Insert',
  'spResearchPublicationDetails_Select',
  'spResearchPublicationDetails_Delete',
  'spFundingAgency_Select_NotIn',
  'spResearchResearchStatus_Insert',
  'spAuthor_Insert',
  'spAuthor_Delete',
  'researchdelete',"spResearchStatus_List",
  'spRole_List',
  'spRole_Insert',
  'spRole_Delete',
  'spRole_Update',
  'spApplication_Module_List',
  "spRoleRight_Insert",
  "spRoleRight_Delete",
  "spRoleRight_List",
  "spUserAccessLevel_By_Username",
  "spUser_PersonalInformation_Get",
  "spUser_Role_List",
  "spUser_Role_Delete",
  "spUser_Role_Insert",
  'spProvince_Select',
  'spTown_Select',
  'spPSGC_Select',
  'spPSGC_Select2',
  "spUser_Insert",
  'spUser_PersonalInformation_InsertUpdate',
  'spUser_PersonalInformation_InsertUpdate2',
  'spUser_Select',
  'spUser_ChangePassword',
  'spUser_Update',
  'spRole_RoleApplication_Select',
  'spUser_ViewDomain_Company_Select_by_Role',
  'spUser_ViewDomain_Company_Insert',
  'spUser_ViewDomain_Company_Delete',
  'spIndustryCode_List',
  'spCompany_Insert',
  'spCompany_Delete',
  "spCompany_Update",
  'spRPTResearch_CountByCompany',
  'spRPTResearch_CountByCompany2',
  'spProgramDiscipline_List',
  'spProgramDisciplineCreate',
  'spProgramDiscipline_Delete',
  'spProgramDiscipline_Update',
  'spCallForProposal_Select',
  'spCallForProposal_Insert',
  'spCallForProposal_update',
  'spCallForProposal_Delete',
  'spKeyword_List',
  'spUser_List',
  'spUser_EmailConfirmationDetail_Update',
  'proposallistsall',
  'spAttachmentType_Select',
  'spAttachmentType_Insert',
  'spAttachmentType_Update',
  'spAttachmentType_Delete',
  'spRPTResearch_TotalCount_byStatus',
  'spRPTResearch_RecentlyPublished',
  'spResearch_Select',

  'spResearchSearch_ByProgramDisciplineDesc',
  'spResearchSearch_ByCompany',
  'search',
  'spProposal_Update',
  'spProposal_Proponent_Insert',
  'spProposal_Proponent_Select'
);

$value = "An error has occurred";

if (isset($_GET["action"]) && in_array($_GET["action"], $possible_url))
{
  switch ($_GET["action"])
    {
      case "spProposal_Proponent_Select":
        $value = spProposal_Proponent_Select($_GET["id"]);
        break;
      case "spResearch_Select":
        $value = spResearch_Select($_GET["id"]);
        break;
      case "spProposal_Proponent_Insert":
        $value = spProposal_Proponent_Insert(
          $_POST["ProposalID"],
          $_POST["UserID"],
          $_POST["FName"],
          $_POST["MName"],
          $_POST["LName"],
          $_POST["SName"]
        );
        break;
      case "spProposal_Update":
        $value = spProposal_Update( 
          $_POST["GeneralTitle"],
          $_POST["LeadAgency"],
          $_POST["Street"],
          $_POST["Address_PSGC"],
          $_POST["Telephone"],
          $_POST["Fax"],
          $_POST["Email"],
          $_POST["FundingAgency_id"],
          $_POST["TotalDuration"],
          $_POST["createdBy"],
          $_POST["id"]);
        break;
      case "search":
        $value = search($_GET["search"],$_GET["type"]);
        break;
      case "spRPTResearch_RecentlyPublished":
        $value = spRPTResearch_RecentlyPublished();
        break;
      case "spRPTResearch_TotalCount_byStatus":
        $value = spRPTResearch_TotalCount_byStatus($_GET['x']);
        break;
      case "spAttachmentType_Delete":
        $value = spAttachmentType_Delete($_GET['id']);
        break;
      case "spAttachmentType_Insert":
        $value = spAttachmentType_Insert(
          $_POST['fagency'],
          $_POST['name'],
          $_POST['desc'],
          $_POST['formdoc'],
          $_POST['fext']
        );
        break;
      case "spAttachmentType_Update":
        $value = spAttachmentType_Update(
          $_POST['id'],
          $_POST['name'],
          $_POST['desc'],
          $_POST['formdoc'],
          $_POST['fext']
        );
        break;
      case "proposallistsall":
        $value = proposallistsall();
        break;
      case "spUser_EmailConfirmationDetail_Update":
        $value = spUser_EmailConfirmationDetail_Update($_GET['id']);
        break;
      case "spUser_List":
        $value = spUser_List();
        break;
      case "spKeyword_List":
        $value = spKeyword_List();
        break;
      case "spCallForProposal_Delete":
        $value = spCallForProposal_Delete($_GET['id']);
        break;
      case "spCallForProposal_update":
        $value = spCallForProposal_update(
          $_POST['id'],
          $_POST['name'],
          $_POST['desc'],
          $_POST['sdate'],
          $_POST['edate'],
          $_POST['fesdate'],
          $_POST['feedate'],
          $_POST['fagency']);
        break;
      case "spCallForProposal_Insert":
        $value = spCallForProposal_Insert(
          $_POST['name'],
          $_POST['desc'],
          $_POST['sdate'],
          $_POST['edate'],
          $_POST['fesdate'],
          $_POST['feedate'],
          $_POST['fagency']);
        break;
      case "spCallForProposal_Select":
        $value = spCallForProposal_Select(
          $_GET['id']);
        break;
      case "spProgramDiscipline_Update":
        $value = spProgramDiscipline_Update(
          $_POST['id'],
          $_POST['name']);
        break;
      case "spProgramDiscipline_Delete":
        $value = spProgramDiscipline_Delete($_GET['id']);
        break;
      case "spProgramDisciplineCreate":
        $value = spProgramDisciplineCreate($_POST['name']);
        break;
      case "spProgramDiscipline_List":
        $value = spProgramDiscipline_List();
        break;
      case "spRPTResearch_CountByCompany":
        $value = spRPTResearch_CountByCompany();
        break;
      case "spRPTResearch_CountByCompany2":
        $value = spRPTResearch_CountByCompany2($_GET['id']);
        break;
      case "spCompany_Delete":
        $value = spCompany_Delete($_GET['id']);
        break;
      case "spCompany_Update":
        $value = spCompany_Update(
          $_POST['id'],
          $_POST['name'],
          $_POST['street'],
          $_POST['psgc'],
          $_POST['phone'],
          $_POST['mobile'],
          $_POST['email'],
          $_POST['fax'],
          $_POST['industry']);
        break;
      case "spCompany_Insert":
        $value = spCompany_Insert(
          $_POST['name'],
          $_POST['street'],
          $_POST['psgc'],
          $_POST['phone'],
          $_POST['mobile'],
          $_POST['email'],
          $_POST['fax'],
          $_POST['industry']);
        break;
      case "spIndustryCode_List":
        $value = spIndustryCode_List();
        break;
      case "spUser_ViewDomain_Company_Delete":
        $value = spUser_ViewDomain_Company_Delete($_GET['id']);
        break;
      case "spUser_ViewDomain_Company_Insert":
        $value = spUser_ViewDomain_Company_Insert($_GET['id'],$_GET['cid']);
        break;
      case "spUser_ViewDomain_Company_Select_by_Role":
        $value = spUser_ViewDomain_Company_Select_by_Role($_GET['id']);
        break;
      case "spRole_RoleApplication_Select":
        $value = spRole_RoleApplication_Select($_GET['id']);
        break;
      case "spUser_Update":
        $value = spUser_Update($_POST['id'],$_POST['email'],$_POST['com']);
        break;
      case "spUser_ChangePassword":
        $value = spUser_ChangePassword($_POST['id'],$_POST['oldp'],$_POST['np']);
        break;
      case "spUser_Select":
        $value = spUser_Select($_GET['email']);
        break;
      case "spUser_PersonalInformation_InsertUpdate2":
        $value = spUser_PersonalInformation_InsertUpdate2(
          $_POST['id'],
          $_POST['lname'],
          $_POST['fname'],
          $_POST['sex'],
          $_POST['height'],
          $_POST['weight'],
          $_POST['bloodtype'],
          $_POST['gsis'],
          $_POST['pagibig'],
          $_POST['philhealth'],
          $_POST['tin'],
          $_POST['agencyno']
        );
        break;
      case "spUser_PersonalInformation_InsertUpdate":
        $value = spUser_PersonalInformation_InsertUpdate(
          $_POST['id'],
          $_POST['lname'],
          $_POST['fname'],
          $_POST['mname'],
          $_POST['sname'],
          $_POST['sex'],
          $_POST['civilstatus'],
          $_POST['citizenship'],
          $_POST['resistreet'],
          $_POST['resi'],
          $_POST['permastreet'],
          $_POST['perma'],
          $_POST['telno'],
          $_POST['mobileno']
        );
        break;
      case "spUser_Insert":
        $value = spUser_Insert($_POST['email'],$_POST['password'],$_POST['company']);
        break;
      case "spPSGC_Select2":
        $value = spPSGC_Select2($_GET['psgc']);
        break;
      case "spPSGC_Select":
        $value = spPSGC_Select($_GET['province'],$_GET['town']);
        break;
      case "spTown_Select":
        $value = spTown_Select($_GET['province']);
        break;
      case "spProvince_Select":
        $value = spProvince_Select();
        break;
      case "spUser_Role_Delete":
        $value = spUser_Role_Delete($_GET['uid']);
        break;
      case "spUser_Role_Insert":
        $value = spUser_Role_Insert($_GET['role'],$_GET['user']);
        break;
      case "spUser_Role_List":
        $value = spUser_Role_List(
          $_GET["id"]);
        break;
      case "spUser_PersonalInformation_Get":
        $value = spUser_PersonalInformation_Get(
          $_GET["email"]);
        break;
      case "spUserAccessLevel_By_Username":
        $value = spUserAccessLevel_By_Username($_GET["email"]);
        break;
      case "spRoleRight_List":
        $value = spRoleRight_List($_GET["roleid"]);
        break;
       case "spRoleRight_Delete":
        $value = spRoleRight_Delete($_GET['roleid']);
        break;
      case "spRoleRight_Insert":
        $value = spRoleRight_Insert($_GET['role'],$_GET['app']);
        break;
      case "spApplication_Module_List":
        $value = spApplication_Module_List();
        break;
      case "spRole_Update":
        $value = spRole_Update($_POST['role'],$_POST['desc'],$_POST['id']);
        break;
      case "spRole_Delete":
        $value = spRole_Delete($_GET['id']);
        break;
      case "spRole_Insert":
        $value = spRole_Insert($_POST['role'],$_POST['desc']);
        break;
      case "spRole_List":
        $value = spRole_List();
        break;
      case "spResearchStatus_List":
        $value = spResearchStatus_List();
        break;
      case "researchdelete":
        $value = researchdelete(
          $_GET["researchid"]);
        break;
      case "spResearchPublicationDetails_Insert":
        $value = spResearchPublicationDetails_Insert(
          $_POST["rid"],
          $_POST["pubtitle"],
          $_POST["pubvolume"],
          $_POST["pubissue"],
          $_POST["pubyear"],
          $_POST["pubpublisher"],
          $_POST["page"],
          $_POST["place"]
            );
        break;
      case "spResearchPublicationDetails_Select":
        $value = spResearchPublicationDetails_Select(
          $_GET["rid"]);
        break;
      case "spResearchPublicationDetails_Delete":
        $value = spResearchPublicationDetails_Delete($_GET["id"]);
        break;


      case "spAuthor_Delete":
        $value = spAuthor_Delete(
          $_GET["id"]
            );
        break;
      case "spAuthor_Insert":
        $value = spAuthor_Insert(
          $_POST["fname"],
          $_POST["mname"],
          $_POST["lname"],
          $_POST["sname"],
          $_POST["cid"]
            );
        break;
      case "spResearchResearchStatus_Insert":
        $value = spResearchResearchStatus_Insert(
          $_POST["rid"],
          $_POST["remarks"],
          $_POST["status"]
            );
        break;
      case "spResearchDocument_Insert":
        $value = spResearchDocument_Insert(
          $_POST["rid"],
          $_POST["name"],
          $_POST["doc"],
          $_POST["type"],
          $_POST["status"]
            );
        break;
      case "spResearchDocument_Select":
        $value = spResearchDocument_Select(
          $_GET["rid"],
          $_GET["type"]);
        break;
      case "spResearchDocument_Delete":
        $value = spResearchDocument_Delete($_GET["id"]);
        break;

      case "spResearchFundingAgency_Select":
        $value = spResearchFundingAgency_Select($_GET["rid"]);
        break;
      case "spResearchFundingAgency_Insert_Update":
        $value = spResearchFundingAgency_Insert_Update(
          $_POST["rid"],
          $_POST["sofid"]);
        break;
      case "spResearchFundingAgency_Delete":
        $value = spResearchFundingAgency_Delete($_GET["id"]);
        break;

      case "spResearchProgramDiscipline_Select":
        $value = spResearchProgramDiscipline_Select($_GET["rid"]);
        break;
      case "spResearchProgramDiscipline_Insert_Update":
        $value = spResearchProgramDiscipline_Insert_Update(
          $_POST["rid"],
          $_POST["did"]);
        break;
      case "spResearchProgramDiscipline_Delete":
        $value = spResearchProgramDiscipline_Delete($_GET["id"]);
        break;


      case "spFundingAgency_Select_NotIn":
        $value = spFundingAgency_Select_NotIn($_GET["rid"]);
        break;

      case "spProgramDiscipline_Select_NotIn":
        $value = spProgramDiscipline_Select_NotIn($_GET["rid"]);
        break;

      case "spResearchKeyword_Select":
        $value = spResearchKeyword_Select($_GET["rid"]);
        break;
      case "spResearchKeyword_Insert":
        $value = spResearchKeyword_Insert(
          $_POST["rid"],
          $_POST["kw"]);
        break;
      case "spResearchKeyword_Delete":
        $value = spResearchKeyword_Delete($_GET["id"]);
        break;


      case "spAuthor_listnot":
        $value = spAuthor_listnot($_GET["cid"],$_GET["rid"]);
        break;
      case "spUserViewDomain_Company_By_Username":
        $value = spUserViewDomain_Company_By_Username($_GET["email"]);
        break;
      case "spResearchAuthor_Select":
        $value = spResearchAuthor_Select($_GET["rid"]);
        break;
      case "spResearchAuthor_Insert_Update":
        $value = spResearchAuthor_Insert_Update(
          $_POST["rid"],
          $_POST["aid"]);
        break;
      case "spResearchAuthorDelete":
        $value = spResearchAuthorDelete($_GET["aid"],$_GET["rid"]);
        break;
      case "spResearch_Liststatus":
        $value = spResearch_Liststatus($_GET["status"]);
        break;
      case "spResearch_List":
        $value = spResearch_List($_GET["company"],$_GET["status"]);
        break;
      case "spProposal_ProjectProponent_List":
        $value = spProposal_ProjectProponent_List($_GET["projectid"]);
        break;
      case "spProposal_ProjectProponent_Insert":
        $value = spProposal_ProjectProponent_Insert(
          $_POST["pid"],
          $_POST["fname"],
          $_POST["lname"],
          $_POST["mname"],
          $_POST["sname"],
          $_POST["percent"],
          $_POST["type"]);
        break;
      case "spProposal_ProjectProponent_Delete":
        $value = spProposal_ProjectProponent_Delete($_GET["id"]);
        break;
      case "statuschange":
        $value = statuschange($_POST["proposalid"],$_POST["statusid"],$_POST["remarks"],$_POST["userid"],$_POST["type"]);
        break;
      case "degreelevel":
        $value = degreelevel();
        break;
      case "spProposal_ProjectSector_Insert_Update":
        $value = spProposal_ProjectSector_Insert_Update($_GET["projectid"],$_GET["cid"]);
        break;
      case "spProposal_ProjectMOI_Insert_Update":
        $value = spProposal_ProjectMOI_Insert_Update($_GET["projectid"],$_GET["cid"]);
        break;
      case "spProposal_ProjectPriorityAgenda_Insert_Update":
        $value = spProposal_ProjectPriorityAgenda_Insert_Update($_GET["projectid"],$_GET["cid"]);
        break;
      case "spProposal_ProjectDiscipline_Insert_Update":
        $value = spProposal_ProjectDiscipline_Insert_Update($_GET["projectid"],$_GET["cid"]);
        break;
      case "projectclassificationupdate":
        $value = projectclassificationupdate($_GET["projectid"],$_GET["cid"]);
        break;
      case "proposalinsert":
        $value = insertProposal(
          $_POST["GeneralTitle"],
          $_POST["LeadAgency"],
          $_POST["Street"],
          $_POST["Address_PSGC"],
          $_POST["Telephone"],
          $_POST["Fax"],
          $_POST["Email"],
          $_POST["FundingAgency_id"],
          $_POST["TotalDuration"],
          $_POST["createdBy"]);
        break;
      case "proposallists":
        $value = proposallists($_GET["user"]);
        break;
      case "proposaldelete":
        $value = proposaldelete($_GET["proposalid"]);
        break;
      case "programinsert":
        $value = programinsert($_GET["proposalid"]);
        break;
      case "getprojecttitles":
        $value = getprojecttitles($_GET["programid"]);
        break;
      case "projectadd":
        $value = projectadd(
          $_POST["programid"],
          $_POST["title"],
          $_POST["duration"]);
        break;
      case "removeprojecttitle":
        $value = removeprojecttitle($_GET["projectid"]);
        break;
      case "removebudget":
        $value = removebudget($_GET["bid"]);
        break;
      case "removebudget2":
        $value = removebudget2($_GET["bid"]);
        break;
      case "FundingAgency_List":
        $value = FundingAgency_List();
        break;
      case "addbudget":
        $value = addbudget($_POST["programid"],$_POST["sof"],$_POST["ps"],$_POST["moe"],$_POST["co"]);
        break;
      case "getbudget":
        $value = getbudget($_GET["programid"]);
        break;
      case "addbudget2":
        $value = addbudget2($_POST["projectid"],$_POST["sof"],$_POST["ps"],$_POST["moe"],$_POST["co"]);
        break;
      case "getbudget2":
        $value = getbudget2($_GET["projectid"]);
        break;
      case "proposaldone":
        $value = proposaldone($_POST["esummary"],$_POST["pid"]);
        break;
      case "login":
        $value = login($_POST["username"],$_POST["password"],$_POST["appname"],$_POST["appsecret"]);
        break;
      case "getuserinfo":
        $value = getuserinfo($_GET["id"]);
        break;
      case "company_List":
        $value = company_List();
        break;
      case "projectinsert":
        $value = projectinsert(
          $_POST["id"],
          $_POST["title"],
          $_POST["duration"],
          $_POST["rndstation"],
          $_POST["siteofi"],
          $_POST["significance"],
          $_POST["objectives"],
          $_POST["literature"],
          $_POST["sbasis"],
          $_POST["methodology"],
          $_POST["majora"],
          $_POST["expectedoutput"],
          $_POST["targetb"],
          $_POST["start"],
          $_POST["completion"]);
        break;
      case "getcoopagency":
        $value = getcoopagency($_GET["projectid"]);
        break;
      case "projectaddcoopagency":
        $value = projectaddcoopagency(
          $_POST["pid"],
          $_POST["cid"]);
        break;
      case "projectdeletecoopagency":
        $value = projectdeletecoopagency($_GET["id"]);
        break;
      case "researchadd":
        $value = researchadd($_POST["title"],$_POST["abstract"],$_POST["company"],$_POST["degreelevel"],$_POST["user"]);
        break;
      case "researchedit":
        $value = researchedit($_POST["id"],$_POST["title"],$_POST["abstract"],$_POST["company"],$_POST["degreelevel"],$_POST["user"]);
        break;
      case "spAttachmentType_Select":
        $value = spAttachmentType_Select($_GET["id"]);
        break;

    }
}




//return JSON array
if ($value == "An error has occurred") {
$filename="sable";
  $database = new Database();
$db = $database->getConnection();
$programid=1128;
  $stmt = $db->prepare("exec spProposal_Project_List
    @Program_id = $programid");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;
while ($row = $stmt ->fetch()) {
    $str =  $row[26];
        
}


// //header('Content-Type:application/pdf');
// header('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
// header('Content-Transfer-Encoding: binary');
// header('Content-Disposition: attachment; filename=my.xlsx');
// ob_clean();
// flush();
echo 'nope!';

exit();

}else
exit(json_encode($value));
?>