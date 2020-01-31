import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  backToDash() {
    this.router.navigate(['dashboard']);
  }

  patientDetails = [
    {
      'id': '4342009',
      'lastUpdated': '2019-01-08T21:59:01.000Z',
      'MRN': '10002701',
      'active': true,
      'fullName': 'SMART, NANCY',
      'telecom': [{
        'system': 'email',
        'value': 'kathy.pickering@cerner.com',
        'use': 'home'
      }],
      'gender': 'female',
      'birthDate': '1980-08-11',
      'address': [{
        'fullAddress': '4567 Blvd Park Plaza, CA 92618 USA',
        'line': [
          '456 Blvd'
        ],
        'city': 'Park Plaza',
        'district': 'Irvine',
        'state': 'CA',
        'postalCode': '92618',
        'country': 'USA'
      }],
      'maritalStatus': {
        'code': 'M',
        'display': 'Married'
      },
      'contact': [{
        'relationship': 'Authorized Representative',
        'fullName': 'SMART, JOE',
        'telecom': [{
          'system': 'phone',
          'value': '9139898765',
          'use': 'home'
        },
          {
            'system': 'phone',
            'value': '9137876555',
            'use': 'mobile'
          },
          {
            'system': 'email',
            'value': 'kathy.pickering@cerner.com',
            'use': 'home'
          }
        ],
        'address': {
          'fullAddress': '1234 Blvd Overland Park, KS 66213 USA',
          'line': [
            '1234 Blvd'
          ],
          'city': 'Overland Park',
          'district': 'Johnson',
          'state': 'KS',
          'postalCode': '66213',
          'country': 'USA'
        },
        'gender': 'male'
      },
        {
          'relationship': 'Authorized Representative',
          'fullName': 'SMART, JOE',
          'telecom': [{
            'system': 'phone',
            'value': '9139898765',
            'use': 'home'
          },
            {
              'system': 'phone',
              'value': '9137876555',
              'use': 'mobile'
            },
            {
              'system': 'email',
              'value': 'kathy.pickering@cerner.com',
              'use': 'home'
            }
          ],
          'address': {
            'use': 'home',
            'fullAddress': '1234 Blvd Overland Park, KS 66213 USA',
            'line': [
              '1234 Blvd'
            ],
            'city': 'Overland Park',
            'district': 'Johnson',
            'state': 'KS',
            'postalCode': '66213',
            'country': 'USA'
          },
          'gender': 'male'
        }
      ],
      'AllCareProviders': [{
        'id': 'Practitioner/1314014',
        'display': 'McCready, Tim',
        'telecom': [{
          'system': 'phone',
          'value': '8162012298',
          'use': 'work'
        },
          {
            'system': 'email',
            'value': 'secureemail@cerner.com'
          }
        ],
        'address': [{
          'use': 'work',
          'fullAddress': '201 W. 5th Street Kansas City, MO 64117 USA',
          'line': [
            '201 W. 5th Street'
          ],
          'city': 'Kansas City',
          'state': 'MO',
          'postalCode': '64117',
          'country': 'USA'
        }]
      }],
      'encounters': [{
        'id': '4269001',
        'reasonOfVisit': [{
          'text': 'Ear Bleeding'
        }],
        'status': 'finished',
        'class': 'outpatient',
        'participant': [{
          'type': 'Ordering Physician',
          'period': {
            'start': '2018-07-20T09:30:00.000Z',
            'end': '2018-07-20T10:30:00.000Z'
          },
          'individual': 'Hopper, Grace'
        }],
        'visitDateTime': {
          'start': '2018-07-20T09:30:00.000Z',
          'end': '2018-07-20T10:30:00.000Z'
        },
        'location': [{
          'id': '1',
          'name': 'John Hopkins Medical Center'
        }],
        'vitals': [{
          'id': 'Tnf7t0.SP6znu2Dc1kPsron.8Qlu-yjOF792bUBX3SIbqfiRJTmZfK.seS16W0121B',
          'lastUpdated': '',
          'effectiveDateTime': '2018-07-20T09:35:00.000Z',
          'status': 'final',
          'observation': 'Body temperature',
          'issued': '',
          'observationValue': {
            'value': '98.6',
            'unit': 'F',
            'interpretation': '',
            'referenceRange': '',
            'dataAbsentReason': ''
          },
          'performer': 'MOORE, SEAN'
        },
          {
            'id': 'Tnf7t0.SP6znu2Dc1kPsron.8Qlu-yjOF792bUBX3SIbqfiRJTmZfK.seS16W0121B',
            'lastUpdated': '',
            'effectiveDateTime': '2018-07-20T09:35:00.000Z',
            'status': 'final',
            'observation': 'Body height',
            'issued': '',
            'observationValue': {
              'value': '72.0',
              'unit': 'in',
              'interpretation': '',
              'referenceRange': '',
              'dataAbsentReason': ''
            },
            'performer': 'MOORE, SEAN'
          },
          {
            'id': 'Tnf7t0.SP6znu2Dc1kPsron.8Qlu-yjOF792bUBX3SIbqfiRJTmZfK.seS16W0111B',
            'lastUpdated': '',
            'effectiveDateTime': '2018-07-20T09:35:00.000Z',
            'status': 'final',
            'observation': 'Body weight',
            'issued': '',
            'observationValue': {
              'value': '176.4',
              'unit': 'lb',
              'interpretation': '',
              'referenceRange': '',
              'dataAbsentReason': ''
            },
            'performer': 'MOORE, SEAN'
          },
          {
            'id': 'Tnf7t0.SP6znu2Dc1kPsron.8Qlu-yjOF792bUBX3SIbqfiRJTmZfK.seS16W0133B',
            'lastUpdated': '',
            'effectiveDateTime': '2018-07-20T09:35:00.000Z',
            'status': 'final',
            'observation': 'Body mass index',
            'issued': '',
            'observationValue': {
              'value': '23.9',
              'unit': 'lb/in2',
              'interpretation': '',
              'referenceRange': '',
              'dataAbsentReason': ''
            },
            'performer': 'MOORE, SEAN'
          },
          {
            'id': 'Tnf7t0.SP6znu2Dc1kPsron.8Qlu-yjOF792bUBX3SIbqfiRJTmZfK.seS16W0111B',
            'lastUpdated': '',
            'effectiveDateTime': '2018-11-01T09:35:00.000Z',
            'status': 'final',
            'observation': 'Diastolic blood pressure',
            'issued': '',
            'observationValue': {
              'value': '61',
              'unit': 'mmHg',
              'interpretation': '',
              'referenceRange': '',
              'dataAbsentReason': ''
            },
            'performer': 'MOORE, SEAN'
          },
          {
            'id': 'Tnf7t0.SP6znu2Dc1kPsron.8Qlu-yjOF792bUBX3SIbqfiRJTmZfK.seS16W0111B',
            'lastUpdated': '',
            'effectiveDateTime': '2018-11-01T09:35:00.000Z',
            'status': 'final',
            'observation': 'Systolic blood pressure',
            'issued': '',
            'observationValue': {
              'value': '135',
              'unit': 'mmHg',
              'interpretation': '',
              'referenceRange': '',
              'dataAbsentReason': ''
            },
            'performer': 'MOORE, SEAN'
          },
          {
            'id': 'Tnf7t0.SP6znu2Dc1kPsron.8Qlu-yjOF792bUBX3SIbqfiRJTmZfK.seS16W0112B',
            'lastUpdated': '',
            'effectiveDateTime': '2018-07-20T09:35:00.000Z',
            'status': 'final',
            'observation': 'Heart rate',
            'issued': '',
            'observationValue': {
              'value': '61',
              'unit': '/min',
              'interpretation': '',
              'referenceRange': '',
              'dataAbsentReason': ''
            },
            'performer': 'MOORE, SEAN'
          },
          {
            'id': 'Tnf7t0.SP6znu2Dc1kPsron.8Qlu-yjOF792bUBX3SIbqfiRJTmZfK.seS16W0111B',
            'lastUpdated': '',
            'effectiveDateTime': '2018-07-20T09:35:00.000Z',
            'status': 'final',
            'observation': 'Respiratory Rate',
            'issued': '',
            'observationValue': {
              'value': '18 /min',
              'unit': '/min',
              'interpretation': '',
              'referenceRange': '',
              'dataAbsentReason': ''
            },
            'performer': 'MOORE, SEAN'
          }
        ],
        'medications': [{
          'id': '22713895',
          'lastUpdated': '2018-06-20T19:10:33.000Z',
          'dateWritten': '2017-09-06T12:08:43.000-05:00',
          'status': 'active',
          'prescriber': 'WellSheet, PW',
          'medication': 'lisinopril',
          'dosageInstruction': [{
            'textShort': '20 mg, Oral, BID',
            'textLong': '20 Milligram Oral 2 times a day. Refills: 0.',
            'timing': {
              'start': '2017-09-06T10:08:00.000-07:00',
              'frequency': '2 times a day',
              'end': '2017-09-06T14:08:00.000-07:00'
            },
            'route': 'Oral',
            'doseQuantity': {
              'value': 20,
              'unit': 'mg'
            }
          }],
          'dispenseRequest': {
            'validityPeriod': {
              'start': '2017-09-06T12:08:43.000-05:00',
              'end': '2017-09-06T16:48:00.000-05:00'
            }
          }
        },
          {
            'id': '22769917',
            'lastUpdated': '2018-06-20T19:10:33.000Z',
            'dateWritten': '2017-09-28T10:36:12.000-05:00',
            'status': 'active',
            'prescriber': 'Houser, Angelica',
            'medication': 'metformin-pioglitazone',
            'dosageInstruction': [{
              'textShort': '35 mg, Oral, Daily',
              'textLong': '35 Milligram Oral every day. Refills: 0.',
              'timing': {
                'start': '2017-09-28T09:00:00.000-07:00',
                'frequency': 'Daily',
                'end': '2017-09-28T12:00:00.000-07:00'

              },
              'route': 'Oral',
              'doseQuantity': {
                'value': 35,
                'unit': 'mg'
              }
            }],
            'dispenseRequest': {
              'validityPeriod': {
                'start': '2017-09-28T10:36:12.000-05:00',
                'end': '2018-09-28T19:48:00.000-05:00'
              }
            }
          }
        ],
        'conditions': [{
          'id': 'd38966559',
          'lastUpdated': '2018-08-08T13:52:07.000Z',
          'assertedBy': 'Tsystem, Pw',
          'dateRecorded': '2018-08-08',
          'condition': {
            'code': '',
            'displayText': 'Essential (primary) hypertension'
          },
          'category': 'Diagnosis',
          'clinicalStatus': 'active',
          'verificationStatus': 'confirmed',
          'onsetDateTime': '2018-08-08T13:52:06.000Z',
          'notes': 'Provided by T System SMART App.',
          'severity': 'Mild'
        },
          {
            'id': 'd38466593',
            'lastUpdated': '2018-06-20T19:09:50.000Z',
            'assertedBy': 'McCurdy, Michael',
            'dateRecorded': '2018-06-20',
            'condition': {
              'code': '',
              'displayText': 'Type 2 diabetes mellitus with stage 3 chronic kidney disease, with long-term current use of insulin'
            },
            'category': 'Diagnosis',
            'clinicalStatus': 'active',
            'verificationStatus': 'confirmed',
            'onsetDateTime': '2018-06-20T16:03:24.000Z',
            'notes': '',
            'severity': 'Severe'
          }
        ]
      },
        {
          'id': '4269002',
          'reasonOfVisit': [{
            'text': 'Hypertension'
          }],
          'status': 'in-progress',
          'class': 'outpatient',
          'participant': [{
            'type': 'Ordering Physician',
            'period': {
              'start': '2019-01-09T16:51:38.000Z',
              'end': '2019-01-09T17:30:38.000Z'
            },
            'individual': 'Rajendran, Madhur'
          }],
          'visitDateTime': {
            'start': '2019-01-09T16:51:38.000Z',
            'end': '2019-01-09T17:30:38.000Z'
          },
          'location': [{
            'name': 'Johns Hopkins Medicine Facility'
          }],
          'vitals': [],
          'medications': [],
          'conditions': []
        }
      ],
      'conditions': [{
        'id': 'p7854123',
        'lastUpdated': '2018-06-20T19:10:13.000Z',
        'assertedBy': 'McCurdy, Michael',
        'dateRecorded': '2018-03-21',
        'condition': {
          'code': '123',
          'displayText': 'CHF following cardiac surgery, postop'
        },
        'category': 'Problem',
        'clinicalStatus': 'resolved',
        'verificationStatus': 'confirmed',
        'abatement': {
          'on': '2018-03-23',
          'status': ''
        },
        'severity': 'Severe'
      },
        {
          'id': 'p7978219',
          'lastUpdated': '2018-06-20T19:10:13.000Z',
          'assertedBy': 'McCurdy, Michael',
          'dateRecorded': '2018-04-06',
          'condition': {
            'code': '456',
            'displayText': 'CHF (congestive heart failure), NYHA class III'
          },
          'category': 'Problem',
          'clinicalStatus': 'active',
          'verificationStatus': 'confirmed',
          'abatement': {},
          'severity': 'Moderate'
        },
        {
          'id': 'p7713981',
          'lastUpdated': '2018-06-20T19:10:13.000Z',
          'assertedBy': 'McCurdy, Michael',
          'dateRecorded': '2018-02-21',
          'condition': {
            'code': '789',
            'displayText': 'CHF (congestive heart failure), NYHA class IV'
          },
          'category': 'Problem',
          'clinicalStatus': 'resolved',
          'verificationStatus': 'confirmed',
          'abatement': {},
          'severity': 'Severe'
        },
        {
          'id': 'p7741935',
          'lastUpdated': '2018-06-20T19:10:13.000Z',
          'assertedBy': 'McCurdy, Michael',
          'dateRecorded': '2018-02-28',
          'condition': {
            'code': '001',
            'displayText': 'CHF (NYHA class II, ACC/AHA stage C)'
          },
          'category': 'Problem',
          'clinicalStatus': 'resolved',
          'verificationStatus': 'confirmed',
          'abatement': {},
          'severity': 'Moderate'
        }
      ],
      'allergies': [{
        'id': '5679733',
        'substance': 'sulfa drugs',
        'recordedDate': '2017-10-05T05:13:17.000-05:00',
        'onset': '2018-09-24T19:00:00.000-05:00',
        'recorder': 'McCurdy, Michael',
        'reporter': 'SMART, WILMA',
        'status': 'active',
        'criticality': 'high',
        'category': 'medication',
        'note': 'Oct  5, 2017 10:13 A.M. UTC - SWL, PW - Angel\'s comment is placed here.\nOct  5, 2017 10:13 A.M. UTC - SWL, PW - Second comment',
        'reaction': [{
          'manifestation': 'Hives',
          'certainty': 'confirmed',
          'onset': '2014-03-07T00:00:00Z',
          'note': 'Severity low enough to be prescribed if needed.'
        }]
      },
        {
          'id': '6875733',
          'substance': 'peanut butter',
          'recordedDate': '2018-09-24T19:00:00.000-05:00',
          'onset': '2018-09-24T19:00:00.000-05:00',
          'recorder': 'Generated Domain User for 0',
          'reporter': 'SMART, WILMA',
          'status': 'active',
          'criticality': 'high',
          'category': 'food',
          'note': 'Oct  5, 2017 10:13 A.M. UTC - SWL, PW - Angel\'s comment is placed here.\nOct  5, 2017 10:13 A.M. UTC - SWL, PW - Second comment',
          'reaction': [{
            'manifestation': 'rash',
            'certainty': 'confirmed',
            'onset': '2014-03-07T00:00:00Z',
            'note': 'Severity low enough to be prescribed if needed.'
          }]
        },
        {
          'id': '6503733',
          'substance': 'Drug Allergy',
          'recordedDate': '2018-09-13T15:20:30.000-05:00',
          'onset': '',
          'recorder': 'Portal, Portal',
          'reporter': 'SMART, WILMA',
          'status': 'resolved',
          'criticality': 'low',
          'category': 'medication',
          'note': 'Oct  5, 2017 10:13 A.M. UTC - SWL, PW - Angel\'s comment is placed here.\nOct  5, 2017 10:13 A.M. UTC - SWL, PW - Second comment',
          'reaction': [{
            'manifestation': 'pain',
            'certainty': 'confirmed',
            'onset': '2014-03-07T00:00:00Z',
            'note': 'Severity low enough to be prescribed if needed.'
          }]
        }
      ]
    }

  ];

  patient = this.patientDetails[0];
  encounter = this.patient.encounters[0];
  problems = this.patient.conditions;
  allergies = this.patient.allergies;
 
}
