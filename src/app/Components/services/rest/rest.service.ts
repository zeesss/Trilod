import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  // endpoint: String = 'http://192.168.0.137:8000/mmpapis/api/v1/provider/';
  username: any;
  password: any;
  patient: any;
  //reqHeader:any;
  testObject = {
    ProviderId: "",
    PageIndex: "",
    Filters: {}
  };
  filters = { FirstName: "" };
  token: any;
  patientDataBody = {
    ProviderId: "",
    PatientId: ""
  };
  deleteTemplateBody = {
    ProviderId: "",
    TemplateID: ""
  };
  patientId: any;
  searchPatientText: any;
  patientData: any;
  selectedPatientData: any;

  /* httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }; */
  reqHeader1 = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': '*/*' })
  };
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('mmpProviderClient:b6b629-er73-9969-91eb-0dfffff445d')
    })
  };
  reqHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic bW1wQmFja0VuZENsaWVudDkxMDI6YjZiNjI5LWVyNzMtOTk2OS05MWViLTBkZmZmZmY0NDVk' })
  };
  // ApiLink="http://192.168.0.154:8080/mmpqa/";
  ApiLink = "http://192.168.52.182:8080/trilod/";
  // ApiLink="http://localhost:8055/mmp/";
  constructor(private http: HttpClient, private router: Router) {

  }

  /*  ValidateUser() {

     const headers = new HttpHeaders()
       .set('Authorization', "Basic " + btoa("mmpProviderClient:b6b629-er73-9969-91eb-0dfffff445d"))
       .set('Content-Type', "application/x-www-form-urlencoded");

     return this.http.post("http://192.168.0.154:8080/mmp/oauth/token?username=Shoaib&password=shobii&grant_type=password&client_id=mmpBackEndClient9102",
       "", { headers: headers }).pipe(
       map(res => res));
   } */

  ValidateUsers(username: String, password: String): Observable<any> {

    const headers = new HttpHeaders()
      .set('Authorization', "Basic " + btoa("mmpProviderClient:b6b629-er73-9969-91eb-0dfffff445d"))
      .set('Content-Type', "application/x-www-form-urlencoded");

    let response = this.http.post(this.ApiLink + "oauth/token?username=" + username + "&password=" + password + "&grant_type=password&client_id=mmpProviderClient",
      "", { headers: headers }).pipe(
      map(this.extractData)
      );

    return response;
  }

  // getPatients(): Observable<any> {
  //
  //       this.testObject.ProviderId = localStorage.getItem('ProviderId');

  //       this.testObject.Filters = this.filters;

  //       let HttpHdr = {
  //             headers: new HttpHeaders({ 'Content-Type': 'application/json',
  //             'Authorization':"bearer " + localStorage.getItem('access_token'),
  //             'Accept': '*/*' })
  //           };
  //   return this.http.post(this.ApiLink+'api/v1/provider/dashboard', this.testObject , HttpHdr).pipe(
  //       map(this.extractData)
  //      );
  // }
  // getPatients(pageIndex:any): Observable<any> {
  //
  //   this.testObject.ProviderId = localStorage.getItem('ProviderId');
  //   this.testObject.PageIndex=pageIndex;
  //   this.testObject.Filters = this.filters;

  //   let HttpHdr = {
  //         headers: new HttpHeaders({ 'Content-Type': 'application/json',
  //         'Authorization':"bearer " + localStorage.getItem('access_token'),
  //         'Accept': '*/*' })
  //       };
  // return this.http.post(this.ApiLink+'api/v1/provider/dashboard', this.testObject , HttpHdr).pipe(
  //   map(this.extractData)
  //  );
  // }


  //   getPatientsFilter(test: any): Observable<any> {
  //        this.testObject.ProviderId = localStorage.getItem('ProviderId');
  //        this.testObject.PageIndex="";
  //       this.testObject.Filters = test;

  // let HttpHdr = {
  //             headers: new HttpHeaders({ 'Content-Type': 'application/json',
  //             'Authorization':"bearer " + localStorage.getItem('access_token'),
  //             'Accept': '*/*' })
  //           };
  //   return this.http.post(this.ApiLink+'api/v1/provider/dashboard', this.testObject , HttpHdr).pipe(
  //       map(this.extractData));



  //   }

  // getPatientData(): Observable<any> {
  //   this.patientDataBody.ProviderId = localStorage.getItem('ProviderId');
  //   this.patientDataBody.PatientId = this.getPatient();


  //   let HttpHdr = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': "bearer " + localStorage.getItem('access_token'),
  //       'Accept': '*/*'
  //     })
  //   };
  //   return this.http.post(this.ApiLink + 'api/v2/provider/patient', this.patientDataBody, HttpHdr).pipe(
  //     map(this.extractData));


  // }
  getPatientDataOnId(Id: any): Observable<any> {


    this.patientDataBody.ProviderId = localStorage.getItem('ProviderId');
    this.patientDataBody.PatientId = Id.toString(10);


    let HttpHdr = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "bearer " + localStorage.getItem('access_token'),
        'Accept': '*/*'
      })
    };
    return this.http.post(this.ApiLink + 'api/v2/provider/patient', this.patientDataBody, HttpHdr).pipe(
      map(this.extractData));
  }

  // logout(Id: any): Observable<any> {
  //

  //     let HttpHdr = {
  //           headers: new HttpHeaders({ 'Content-Type': 'application/json',
  //           'Authorization':"bearer " + localStorage.getItem('access_token'),
  //           'Accept': '*/*' })
  //         };
  // return this.http.post(this.ApiLink+'api/v1/logout', {"ProviderId":Id} , HttpHdr).pipe(
  //     map(this.extractData));
  // }
  //   forgotpassword(forgotpasswordBody:{}): Observable<any>{
  // let HttpHdr = {
  //             headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //           };
  //   return this.http.post(this.ApiLink+'api/v1/provider/ForgotPassword', forgotpasswordBody , HttpHdr).pipe(
  //       map(this.extractData));

  //   }
  changePassword(passwordBody: {}): Observable<any> {
    let HttpHdr = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "bearer " + localStorage.getItem('access_token'),
        'Accept': '*/*'
      })
    };
    return this.http.post(this.ApiLink + 'api/v1/provider/ChangePassword', passwordBody, HttpHdr).pipe(
      map(this.extractData));

  }
  saveTemplate(saveTemplateBody: any): Observable<any> {


    let HttpHdr = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "bearer " + localStorage.getItem('access_token'),
        'Accept': '*/*'
      })
    };
    return this.http.post(this.ApiLink + 'api/v1/provider/saveTemplate', saveTemplateBody, HttpHdr).pipe(
      map(this.extractData));

  }
  getAllTemplates(getTemplateBody: any): Observable<any> {


    let HttpHdr = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "bearer " + localStorage.getItem('access_token'),
        'Accept': '*/*'
      })
    };
    return this.http.post(this.ApiLink + 'api/v1/provider/getAllTemplates', getTemplateBody, HttpHdr).pipe(
      map(this.extractData));

  }
  login(formData) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "login/authenticate", formData);
  }
  logout(): Observable<any> {


    let HttpHdr = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.ApiLink + 'login/sessiontimeout?user_id=' + localStorage.getItem('userId')).pipe(map(res => { return res }));
  }

  getControlTaskList() {


    // let HttpHdr = {
    //   headers: new HttpHeaders({
    //   'user_id':localStorage.getItem('userId'),
    //   'token':localStorage.getItem('token')
    //    })
    // };

    return this.http.get(this.ApiLink + 'controltask/').pipe(map(res => { return res }));

  }
  getControlTaskListOnlyActive() {

    return this.http.get(this.ApiLink + 'controltask/onlyActive').pipe(map(res => { return res }));

  }
  findControlTaskFromAudit(id) {
    return this.http.get(this.ApiLink + 'controltaskauditsession/byAuditSessionId/' + id).pipe(map(res => { return res }));

  }
  updateControlTaskFromSessionAudit(id, editControlTaskFromSessionAudit): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      })
    };
    return this.http.post(this.ApiLink + "controltaskauditsession/savelist/" + id, editControlTaskFromSessionAudit, HttpHdr);
  }
  addControlTask(controlObject) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "controltask/save", controlObject, HttpHdr);
  }
  deleteControlTask(i): Observable<any> {
    return this.http.delete(this.ApiLink + "controltask/delete/" + i);
  }
  updateControlTask(controlObject): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.ApiLink + "controltask/update/", controlObject, HttpHdr);
  }
  findBusinessRuleList() {
    // let HttpHdr = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json',
    //   'user_id':localStorage.getItem('userId'),
    //   'token':localStorage.getItem('token'),
    // 'Accept': '*/*'
    //    })
    // };
    return this.http.get(this.ApiLink + 'controltask/findBusinessRulesList').pipe(map(res => { return res }));

  }
  getRuleTypeList() {

    // let HttpHdr = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json',
    //   'user_id':localStorage.getItem('userId'),
    //   'token':localStorage.getItem('token'),
    // 'Accept': '*/*'
    //    })
    // };
    return this.http.get(this.ApiLink + 'ruletype/').pipe(map(res => { return res }));
  }
  getFileTypeList() {

    let HttpHdr = {
      headers: new HttpHeaders({
        'user_id': localStorage.getItem('userId'),
        'token': localStorage.getItem('token')
      })
    };
    return this.http.get(this.ApiLink + 'filetype/', HttpHdr).pipe(map(res => { return res }));

  }
  addFileType(fileObject) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "filetype/save", fileObject, HttpHdr);
  }
  updateFileType(controlObject): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.ApiLink + "filetype/update/", controlObject, HttpHdr);
  }
  getCompanyList() {

    // alert(localStorage.getItem('userId'));
    //  alert(localStorage.getItem('token'));
    //   let header = new HttpHeaders();
    // header = header.set('user_id', localStorage.getItem('userId'));
    // header = header.set('token', localStorage.getItem('token'));
    //  header = header.set('Access-Control-Allow-Origin', '*');
    // header = header.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    //header = header.set('Accept', '*/*');

    let HttpHdr = {
      headers: new HttpHeaders({
        'user_id': localStorage.getItem('userId'),
        'token': localStorage.getItem('token')
      })
    };
    // let HttpHdr = {
    //   headers: new HttpHeaders({
    //   'user_id':'1233',
    //   'token':'1233'
    //    })
    // };
    // alert(header.get('user_id'));
    // alert(header.get('token'));
    return this.http.get(this.ApiLink + 'client/', HttpHdr).pipe(map(res => { return res }));

  }
  addCompany(companyObject) {

    let HttpHdr = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user_id': localStorage.getItem('userId'),
        'token': localStorage.getItem('token')
      })
    };
    return this.http.post(this.ApiLink + "client/save", companyObject, HttpHdr);
  }
  updateCompany(companyObject): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.ApiLink + "client/update/", companyObject, HttpHdr);
  }
  getPopulationList() {


    return this.http.get(this.ApiLink + 'population/').pipe(map(res => { return res }));

  }
  findPopulationFromAudit(id) {
    return this.http.get(this.ApiLink + 'population/findByAuditSessionId/' + id).pipe(map(res => { return res }));

  }
  addPopulation(populationObject) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "population/save", populationObject, HttpHdr);
  }
  updatePopulationFromSessionAudit(editPopulationFromSessionAudit): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.ApiLink + "population/update/", editPopulationFromSessionAudit, HttpHdr);
  }
  getSessionsList() {
    return this.http.get(this.ApiLink + 'auditsession/').pipe(map(res => { return res }));
  }
  addSessionAudit(sessionObject) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "auditsession/save", sessionObject, HttpHdr);
  }
  updateSessionAudit(editSessionObject): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.ApiLink + "auditsession/update/", editSessionObject, HttpHdr);
  }

  auditSessionFindByClient(id): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get(this.ApiLink + "auditsession/findByClientId/" + id).pipe(map(res => { return res }));

  }

  configFindBySessionId(id): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get(this.ApiLink + "caf/findByAuditSessionId/" + id).pipe(map(res => { return res }));

  }
  addConfigForAudit(configObject) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "caf/save", configObject, HttpHdr);
  }
  getConfigList(): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get(this.ApiLink + "addfile/listConfiguration/").pipe(map(res => { return res }));

  }
  abortSessionAudit(editSessionId): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })

    };
    return this.http.put(this.ApiLink + "auditsession/setAborted/" + editSessionId, HttpHdr);
  }
  searchCompanyAudit(searchString): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get(this.ApiLink + "auditsession/findAllBySearch/" + searchString).pipe(map(res => { return res }));
  }
  addControlTaskFromSessionAudit(id, controlBody) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "controltaskauditsession/savelist/" + id, controlBody, HttpHdr);
  }
  findSession(id) {
    return this.http.get(this.ApiLink + 'auditsession/findById/' + id).pipe(map(res => { return res }));
  }
  findSessionByClientCompleted(id) {
    return this.http.get(this.ApiLink + 'auditsession/findByClientIdCompleted/' + id).pipe(map(res => { return res }));
  }
  SessionDateSearch(startDate, endDate, type, searchString) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get(this.ApiLink + "auditsession/findAllBySearchDate/" + startDate + "/" + endDate + "/" + type + "/" + searchString).pipe(map(res => { return res }));
    //return this.http.post("http://192.168.52.182:8080/trilod/addfile/add", formData  );

  }

  importFile(formData) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "addfile/add", formData);

  }
  addTemplate(formData) {
    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "template/add", formData);
  }
  addSampling(samplingBody) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "fileData/addsampling", samplingBody);
  }
  getRowsAfterSampling(id) {
    return this.http.get(this.ApiLink + 'fileData/findAllRowsByAuditFileId/' + id).pipe(map(res => { return res }));
  }
  updateSamplingRow(formData) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "fileData/addsamplingonerow", formData);

  }
  applyRule(sessionId, fileId) {
    return this.http.get(this.ApiLink + 'ruleengine/apply/' + sessionId + '/' + fileId).pipe(map(res => { return res }));
  }
  getWorkPaperTemplateById(id) {
    return this.http.get(this.ApiLink + 'wpt/findByAuditSession/' + id).pipe(map(res => { return res }));
  }
  getWorkPaperTemplateBySessionId(id) {
    return this.http.get(this.ApiLink + 'wpt/findNamesListByAuditSession/' + id).pipe(map(res => { return res }));
  }
  getWorkPaperTemplateFindById(id) {
    return this.http.get(this.ApiLink + 'wpt/findById/' + id).pipe(map(res => { return res }));
  }
  getEventLogById(id) {
    return this.http.get(this.ApiLink + 'eventlog/findByAuditSessionId/' + id).pipe(map(res => { return res }));
  }
  getEventLogBySessionId(id) {
    return this.http.get(this.ApiLink + 'eventlog/findNamesListByAuditSessionId/' + id).pipe(map(res => { return res }));
  }
  getEventLogFindById(id) {
    return this.http.get(this.ApiLink + 'eventlog/findById/' + id).pipe(map(res => { return res }));
  }
  getRolesList() {
    return this.http.get(this.ApiLink + 'role/').pipe(map(res => { return res }));
  }
  getRoleByName(name) {
    return this.http.get(this.ApiLink + 'role/findByRoleName/' + name).pipe(map(res => { return res }));
  }
  addRole(roleBody) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "role/save", roleBody);
  }

  updateRole(updateBody): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })

    };
    return this.http.put(this.ApiLink + "role/update/", updateBody, HttpHdr);
  }
  getRoleById(id) {
    return this.http.get(this.ApiLink + 'role/findById/' + id).pipe(map(res => { return res }));
  }
  updatePassword(UserObject): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.ApiLink + "login/changePassword", UserObject, HttpHdr);

  }
  addControlAttribute(fileObject) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "controlAttribute/save", fileObject, HttpHdr);

  }
  getControlAttributeList() {


    return this.http.get(this.ApiLink + 'controlAttribute/').pipe(map(res => { return res }));

  }
  updateControlAttribute(controlObject): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.ApiLink + "controlAttribute/update/", controlObject, HttpHdr);
  }
  searchControlAttribute(searchString): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get(this.ApiLink + "controlAttribute/findByName/" + searchString).pipe(map(res => { return res }));
  }
  getRiskControlMatrixList() {




    return this.http.get(this.ApiLink + 'rcm/').pipe(map(res => { return res }));

  }
  addRiskControlMatrix(controlObject) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "rcm/save", controlObject, HttpHdr);
  }
  updateRiskControlMatrix(controlObject): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.ApiLink + "rcm/update/", controlObject, HttpHdr);
  }
  searchRiskControlMatrix(searchString): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get("http://192.168.52.182:8080/trilod/rcm/findByRCMName/" + searchString).pipe(map(res => { return res }));
  }
  getUsersList() {
    return this.http.get(this.ApiLink + 'user/').pipe(map(res => { return res }));
  }
  getUserByName(name) {
    return this.http.get(this.ApiLink + 'user/findByUserName/' + name).pipe(map(res => { return res }));
  }
  addUser(userBody) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "user/save", userBody);
  }
  addUserRoleList(userId, roleList) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "userRoles/saveList/" + userId, roleList);
  }
  getRolesByUserId(id) {
    return this.http.get(this.ApiLink + 'userRoles/findByUserId/' + id).pipe(map(res => { return res }));
  }
  updateUser(updateBody): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })

    };
    return this.http.put(this.ApiLink + "user/update/", updateBody, HttpHdr);
  }
  getUserById(id) {
    return this.http.get(this.ApiLink + 'user/findById/' + id).pipe(map(res => { return res }));
  }
  getRoleEdit_RoleList() {

    return this.http.get('http://192.168.52.182:8080/trilod/role/active').pipe(map(res => { return res }));
  }
  getRoleDropDown_SelectionList(roleId) {

    return this.http.get('http://192.168.52.182:8080/trilod/roleAccess/findByRoleId/' + roleId).pipe(map(res => { return res }));

  }
  getRoleEdit_FormName() {

    return this.http.get('http://192.168.52.182:8080/trilod/form/').pipe(map(res => { return res }));
  }
  saveRoleEdit_Selection(roleId, updateBody) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post("http://192.168.52.182:8080/trilod/roleAccess/saveList/" + roleId, updateBody, HttpHdr);

  }
  findFormsByUserId(id) {

    return this.http.get('http://192.168.52.182:8080/trilod/user/findUserFormsById/' + id).pipe(map(res => { return res }));
  }

  convertToExcel(formData) {

    // let HttpHdr = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // };
    //   const options = new RequestOptions({
    //     responseType: ResponseContentType.Blob
    // });
    const httpOptions = {
      headers: new HttpHeaders({
        'responseType': 'ResponseContentType.Blob'

      })
    };
    return this.http.post(this.ApiLink + "fconverter/convertxlsx", formData, httpOptions);

  }


  forgotpassword(email): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })

    };
    return this.http.put(this.ApiLink + "login/forgotPassword/" + email, HttpHdr);
  }
  verifyCode(email, code): Observable<any> {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })

    };
    // alert(this.ApiLink+"login/verifyCode/"+email+"/"+code);
    return this.http.put(this.ApiLink + "login/verifyCode/" + email + "/" + code, HttpHdr);
  }


  private extractData(res: Response) {
    let body = res;
    return body || {};
  }


  //Get Template List
  getTemplateList(clientId) {
    return this.http.get(this.ApiLink + 'template/findByClient/' + clientId);
  }

  //Get Tempalte Details
  getTemplateDetails(templateId) {
    return this.http.get(this.ApiLink + 'template/getDetails/' + templateId);
  }

  //Get Tempalte Details
  saveControl(controlBody) {
    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(this.ApiLink + 'control/add/', controlBody, HttpHdr);
  }

  //Get Tempalte Details
  saveControlDetail(controlBody) {
    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(this.ApiLink + 'cDetail/saveList/', controlBody, HttpHdr);
  }
  saveAuditSession(auditBody){
    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(this.ApiLink + 'auditsession/save', auditBody, HttpHdr);
  }

  getRuleList(clientId) {
    return this.http.get(this.ApiLink + 'rule/findByClient/' + clientId);
  }
  getControlList(clientId)
  {
    return this.http.get(this.ApiLink + 'control/findByClientId/' + clientId).pipe(map(res => { return res }));
   // return this.http.get(this.ApiLink + 'control/findByClientId/' + clientId);
  }
  getControlFieldName(clientId)
  {
    return this.http.get(this.ApiLink + 'cDetail/findByControlId/' + clientId).pipe(map(res => { return res }));
  }
  saveRule(ruleBody)
  {
    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(this.ApiLink + 'rule/add/', ruleBody, HttpHdr);
  }

  auditControlSource(formData) {
    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "asc/addAuditSessionControls", formData);
  }

  check_Template_Mapping(Body)
  {
    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + 'template/checkMapping', Body, HttpHdr);
  }
  
    addEvidencesAgainstTemplateId(formData) {

    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + "dataTable/add", formData);
  }
  saveTemplateMapping(mappingEvidence)
  {
    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + 'template/mappingEvidence', mappingEvidence, HttpHdr);
  }
  controlsAgainstSessionId(sessionId){
    return this.http.get(this.ApiLink + 'asc/findByAuditSessionId/' + sessionId).pipe(map(res => { return res }));

  }
  executeControl(body){
    
    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.ApiLink + 'control/execute', body, HttpHdr);
    //return this.http.get(this.ApiLink + 'control/execute/' + controlId).pipe(map(res => { return res }));

  }
  findAllRowsByAuditFileId(AUDIT_SESSION_ID,CONTROL_ID)
  {
    return this.http.get(this.ApiLink + 'dataTable/findAllRowsByAuditFileId/' + AUDIT_SESSION_ID+"/"+CONTROL_ID).pipe(map(res => { return res }));
  }
  //MultiSheetExcelUpload
  getSheetNames(formData){
    let HttpHdr = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
    };
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'multipart/form-data');   
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data'
      }),
      formData

    } 
    
    return this.http.post(this.ApiLink + 'template/getSheetNames/', formData).pipe(map(res => { return res }));

  }
  addMultiSheets(formData){
    return this.http.post(this.ApiLink + "template/addMultiple/", formData);

  }
  addOrganization(formData)
  {
    return this.http.post(this.ApiLink + "organization/add/", formData);
  }
  listOrganization()
  {
    return this.http.get(this.ApiLink + 'organization/').pipe(map(res => { return res }));
  }
  organization_findById(id)
  {
    
    return this.http.get(this.ApiLink + 'organization/findById/'+id).pipe(map(res => { return res }));
  }
  
  organization_update(id,body): Observable<any> {

  
    return this.http.put(this.ApiLink + "organization/update/" + id, body);
  }
  
  organization_delete(id): Observable<any> {
    return this.http.delete(this.ApiLink + "organization/delete/" + id);
  }
}
