const typeDefs = `
   type Announcement {
    hashId: String
    id: Int
    title: String
    content: String
    createdTime: String
    lastModifiedTime: String
    isActive: Boolean
   }
   
   type LoginInformation {
    isLogin: Boolean
   }
   
   type PersonalBankAccount {
    id: Int
    bankName: String
    internalDisplayName: String
    bankCode: String
    bankNo: String 
    accountName: String
    accountNumber: String
    mark: String
    isCurrentlyActive: Boolean
    createdTime: String
    lastModifiedTime: String
    lastModifiedPerson: String
   }

   # the schema allows the following query:
   type Query {
    announcements: [Announcement]
    loginInformation: LoginInformation
   }
   
   type Mutation {
    updatePersonalBankAccount(id:Int! mark:String isCurrentlyActive: Boolean): PersonalBankAccount
   }
   
`

module.exports = typeDefs
