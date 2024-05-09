

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User";


            
const secretKey = "dffgfghhhhhhhhhhhffffffffff";

class UserController {
  static userRegistration = async (req: any, res: any) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({ "status": "failed", "message": "Email already exists" });
    } else {
      if (firstName && lastName && email && password) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const doc = new UserModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword
          });
          await doc.save();
          res.send({"status": "sucess", "message": "Register Sucessful"})
        } catch (error) {
          console.log(error);
          res.send({ "status": "failed", "message": "Unable to Register" });
        }
      } else {
        res.send({ "status": "failed", "message": "All fields are required" });
      }
    }
  };

  static userLogin = async (req: any, res: any) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      if (email && password) {
        const user: any = await UserModel.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if ((user.email === email) && isMatch) {



            const token = jwt.sign({ userID: user?._id }, secretKey, { expiresIn: "5d" });
            res.status(201).send({ "status": "success", "message": "Login Success", "token": token });
          } else {
            res.send({ "status": "failed", "message": "Email or Password is not valid" });
          }
        } else {
          res.send({ "status": "failed", "message": "You are not a Registered User" });
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ "status": "failed", "message": "Unable to Login" });
    }
  };


  static getAllUsers = async (req: any, res: any) => {
    try {
      // Retrieve all users from the database
      const users = await UserModel.find({}, { password: 0 }); // Exclude the password field from the response
  
      return res.status(200).json({ users });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error fetching users" });
    }
  }

  static quation = async (req: any, res: any) => {
    try {
    
      let data = {
          "Root": {
              "Authentication": {
                  "WACode": "20000001",
                  "WAAppCode": "30000011",
                  "WAUserID": "USER01",
                  "WAUserPwd": "pass@123",
                  "WAType": "0",
                  "ProductCode": "2858"
              },
              "Customer": {
                  "CustomerType": "Individual",
                  "CustomerName": "Simran Kour Bhatia",
                  "DOB": "19/02/1998",
                  "Gender": "F",
                  "CanBeParent": "0",
                  "ContactTelephoneSTD": "NULL",
                  "MobileNo": "9022689676",
                  "Emailid": "SANDEEPCA2006@GMAIL.COM",
                  "PresentAddressLine1": "B 102 MADHUSHREE APTS P NO 33 NR",
                  "PresentAddressLine2": "DMART SEC 40 SEAWOOD WEST NAVI  MUMBAI NERUL NODE 3 THANE MH INDIA 400706 400706",
                  "PresentStateCode": "Maharashtra",
                  "PresentCityDistCode": "Thane",
                  "PresentPinCode": "400706",
                  "PermanentAddressLine1": "B 102 MADHUSHREE APTS P NO 33 NR",
                  "PermanentAddressLine2": "DMART SEC 40 SEAWOOD WEST NAVI  MUMBAI NERUL NODE 3 THANE MH INDIA 400706 400706",
                  "PermanentStateCode": "Maharashtra",
                  "PermanentCityDistCode": "Thane",
                  "PermanentPinCode": "400706",
                  "CustGSTNo": "NULL",
                  "ProductName": "A PLUS HEALTH INSURANCE",
                  "InstrumentNo": "NULL",
                  "InstrumentDate": "NULL",
                  "BankID": "NULL",
                  "PosPolicyNo": "NULL",
                  "ProductCode": "2858",
                  "WAURN": "NULL",
                  "NomineeName": "hhh",
                  "NomineeRelation": "Son",
                  "PANNO": "NULL",
                  "Aadhaarno": "NULL",
                  "EIA": "NULL",
                  "CKYCNo": "",
                  "Ref_No_Unique_KYC": ""
              },
              "POSAGENT": {
                  "Name": "NULL",
                  "PAN": "NULL",
                  "Aadhar": "NULL",
                  "Email": "NULL",
                  "MobileNo": "NULL",
                  "Location": "NULL",
                  "Information1": "NULL",
                  "Information2": "NULL"
              },
              "Product": {
                  "GeneralProposal": {
                      "GeneralProposalGroup": {
                          "DistributionChannel": {
                              "BranchDetails": {
                                  "IMDBranchName": "NULL",
                                  "IMDBranchCode": "NULL"
                              },
                              "SPDetails": {
                                  "SPName": "NULL",
                                  "SPCode": "NULL"
                              }
                          },
                          "GeneralProposalInformation": {
                              "TypeOfBusiness": "FROM INTERMEDIARY",
                              "ServiceTaxExemptionCategory": "No Exemption",
                              "BusinessType": "New",
                              "Sector": "Others",
                              "DealId": "INTR-2312-0019722",
                              "PolicyType": "Individual",
                              "FamilyComposition": "1 Adult",
                              "ParentComposition": "",
                              "PlanType": "Diamond",
                              "ProposalDate": "04/03/2023",
                              "PolicyDuration": "1",
                              "PolicyNumberChar": "NULL",
                              "PolicyEffectiveDate": {
                                  "Fromdate": "05/03/2023",
                                  "Todate": "04/03/2024",
                                  "Fromhour": "00:01",
                                  "Tohour": "23:59"
                              },
                               "EmployeeCode": "",
                              "InstallmentFrequency": "",
                              "RequestType": "Quotation"
                          }
                      },
                      "FinancierDetails": {
                          "FinancierDtlGrp": {
                              "FinancierDtlGrpData": {
                                  "FinancierCode": "NULL",
                                  "AgreementType": "NULL",
                                  "BranchName": "NULL",
                                  "FinancierName": "NULL",
                                  "SrNo": "NULL"
                              }
                          }
                      },
                      "PreviousPolicyDetails": {
                          "PreviousPolDtlGroup": {
                              "PreviousPolDtlGroupData": {
                                  "ProductCode": "NULL",
                                  "ClaimSettled": "NULL",
                                  "ClaimPremium": "0",
                                  "ClaimAmount": "0",
                                  "DateofLoss": "NULL",
                                  "NatureofLoss": "NULL",
                                  "ClaimNo": "99999999",
                                  "PolicyEffectiveTo": "999999",
                                  "PolicyEffectiveFrom": "99",
                                  "PolicyPremium": "0",
                                  "PolicyNo": "NULL",
                                  "PolicyYear": "NULL",
                                  "OfficeCode": "NULL",
                                  "CorporateCustomerId": "NULL",
                                  "InsurerName": "NULL",
                                  "InsurerAddress": "NULL"
                              }
                          },
                          "PreviousPolicyType": "Package Policy",
                          "OfficeAddress": "NULL"
                      }
                  },
                  "PremiumCalculation": {
                      "NetPremium": "0",
                      "ServiceTax": "0",
                      "StampDuty2": "0",
                      "TotalPremium": "0",
                      "CGST": "0",
                      "SGST": "0",
                      "UGST": "0",
                      "IGST": "0",
                        "TotalBasePremium": "0",
                      "TotalAddonPremium": "0",
                      "TotalDiscountPremium": "0"
                  },
                  "Risks": {
                      "Risk": {
                          "RisksData": {
                              "InsuredDetails": {
                                  "InsuredDetailsGroup": [
                                      {
                                          "InsuredType": "Adult",
                                          "FirstName": "gg",
                                          "LastName": "p",
                                          "DOB": "01/02/1998",
                                          "Gender": "F",
                                          "Relationship": "Self",
                                          "Occupation": "Lawyers",
                                          "NomineeName": "hhh",
                                          "NomineeRelationship": "Son",
                                          "NomineeDOB": "02/01/1997",
                                          "NomineeAge": "NULL",
                                          "NomineeGender": "NULL",
                                          "AppointeeName": "NULL",
                                          "AppointeeDOB": "NULL",
                                          "AppointeeAge": "NULL",
                                          "AppointeeGender": "NULL",
                                          "AppointeeRelation": "NULL",
                                          "HealthIndicators": {
                                            "PED": "",
                                              "PEDDeclared": "",
                                              "BodyMassIndex": "17",
                                              "IllnessOrDisease": "",
                                              "TreatementOrMedicine": "",
                                              "VisitedDoctor": "",
                                              "Hospitalized": "",
                                              "TakenAnyTreatement": "",
                                              "Alcohol": "",
                                              "AlcoholType": "",
                                              "AlcoholQuantity": "",
                                              "AlcoholDuration": "",
                                              "Smoker": "Y",
                                              "SmokerType": "Cigrate",
                                              "SmokerQuantity": "0",
                                              "SmokerDuration": "5",
                                              "Tobacco": "Y",
                                              "TobaccoType": "Gutkha",
                                              "TobaccoQuantity": "0",
                                              "TobaccoDuration": "0",
                                              "Narcotics": ""
                                          },
                                          "CoverDetails": {
                                              "Covers": [
                                                  {
                                                      "Applicable": "True",
                                                      "CoverSI": "2500000",
                                                      "CoverRate": "0.000000",
                                                      "CoverPremium": "0.00",
                                                      "CoverGroups": "Basic Insurance Cover"
                                                  },
                                                    {
                                                      "Applicable": "True",
                                                      "CoverSI": "2500000",
                                                      "CoverRate": "0.000000",
                                                      "CoverPremium": "0.00",
                                                      "CoverGroups": "COVERAGE FOR NON-MEDICAL ITEMS"
                                                  },
                                                   {
                                                      "Applicable": "True",
                                                      "CoverSI": "2500000",
                                                      "CoverRate": "0.000000",
                                                      "CoverPremium": "0.00",
                                                      "CoverGroups": "PRE-EXISTING DISEASE WAITING PERIOD"
                                                  }
                                              ]
                                          }
                                      }
                                  ]
                              },
                              "OtherLoadings": {
                                  "OtherLoadingGroup": {
                                      "OtherLoadingGroupData": {
                                          "LoadingAmount": "0",
                                          "LoadingRate": "0",
                                          "SumInsured": "0",
                                          "Rate": "0",
                                          "Premium": "0",
                                          "Applicable": "False",
                                          "Description": "NULL"
                                      }
                                  }
                              },
                              "OtherDiscounts": {
                                  "OtherDiscountGroup": [
                                      {
                                          "DiscountAmount": "0",
                                          "DiscountRate": "0",
                                          "SumInsured": "0.00",
                                          "Rate": "0.00",
                                          "Premium": "0",
                                          "Applicable": "True",
                                          "Description": "Women Discount"
                                      }
                                  ]
                              }
                          }
                      }
                  }
              },
              "PaymentDetails": {
                  "PaymentEntry": {
                      "PaymentId": "NULL",
                      "MICRCheque": "NULL",
                      "InstrumentDate": "NULL",
                      "DraweeBankName": "NULL",
                      "HOUSEBANKNAME": "NULL",
                      "AmountPaid": "NULL",
                      "PaymentType": "NULL",
                      "PaymentMode": "NULL",
                      "InstrumentNo": "NULL",
                      "Status": "NULL",
                      "DepositSlipNo": "NULL",
                      "PayerType": "NULL"
                  }
              },
              "Errors": {
                  "ErrorCode": "0",
                  "ErrDescription": "NULL"
              }
          }
      };
       let object = JSON.stringify(data);
       const  CustomerName= JSON.stringify(req.body)
 const result = object.replace(CustomerName)

      res.send(object)

            
  
    } catch (error) {
      console.log(error);
    }
  };


}

export default UserController;
