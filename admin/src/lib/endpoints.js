export const ENDPOINTS = {
  baseUrl: "http://localhost:8080",
  // Auth
  SIGN_UP: '/api/auth/register',
  SEND_PASS_RESET_OTP: 'auth/send-reset-pass-otp',
  RESET_PASS: '/auth/reset-password',

  // Contacts
  GET_TOTAL_CLIENTS: '/client-contact/total-clients',
  CREATE_NEW_POSITION: '/client-contact/position',
  ALL_CLIENT_POSITION: '/client-contact/position',
  ONE_CLIENT_POSITION: '/client-contact/position/',
  CREATE_CLIENTS: '/client-contact',

  // Contacts --> employee
  ALL_EMPLOYEES: '/employee-contact/allemployees',
  CREATE_NEW_EMPLOYEE_POSITION: '/employee-contact/position',
  ALL_EMPLOYEE_POSITION: '/employee-contact/position',
  ONE_EMPLOYEE_POSITION: '/employee-contact/position/',

  // Contacts --> Leads
  LEAD_CONTACT: '/lead-contact/',
  CREATE_NEW_LEAD_POSITION: '/lead-contact/position',
  ALL_LEAD_POSITION: '/lead-contact/position',

  // Contacts --> Relationships
  CREATE_NEW_RELATION_POSITION: '/relation-contact/position',
  ALL_RELATION_POSITION: '/relation-contact/position',
  ONE_RELATION_POSITION: '/relation-contact/position/',

  // Contacts --> Vendor
  VENDOR_CONTACT: '/vendor-contact/',
  CREATE_NEW_VENDOR_POSITION: '/vendor-contact/position',
  ALL_VENDOR_POSITION: '/vendor-contact/position',

  //Document
  UPLOAD_DOCUMENT: '/document/upload',
  ADD_RECIPIENTS: '/document-recipient/',
  EDIT_RECIPIENTS: '/document-recipient/recipient/',
  GET_DOC_BY_HASH: '/document/email-link?hashCode=',
  GET_DOC_BY_TOKEN: '/document/email-link?token=',
  Get_DOCUMENT_BY_ID: '/document/documentId/',
  GET_USER_DOCS: '/document/',
  GET_RECEIVED_DOCS: '/document/received',
  DELETE_DOCUMENTS: '/document/delete',
  DOCUMENT_RESEND: 'document-recipient/email/resend',

  //custome fields
  ADD_CUSTOM_FIELD: '/document-custome-fields/add',
  DELETE_CUSTOM_FIELD: '/document-custome-fields/delete?id=',
  GET_CUSTOM_FIELDS_BY_USER: '/document-custome-fields/getbyuser',
  // get user
  GET_USER: '/user',
  GET_USER_TABLE_DATA: '/user?userType=user',
  GET_USER_BY_ID: '/user/user',
  UPDATE_USER: '/user/user',
  // invoice
  GET_INVOICE: '/invoice',
  GET_CUSTOMER: '/customer',

  //Document- Signature & stamps & initials
  SIGNATURE_AND_INITIAL: '/document-signature/signatures',
  UPLOAD_SIGNATURES: '/document-signature/upload',

  //Document- Signature & stamps & initials
  SIGNATURE_AND_INITIAL: '/document-signature/signatures',
  UPLOAD_SIGNATURES: '/document-signature/upload',

  // Marketing Emails
  COMPOSE_EMAIL: 'marketing/compose-email',
  GET_ALL_EMAILS: 'marketing/emails',
  GET_EMAIL_BY_ID: 'marketing/emails/',
  DELETE_EMAILS: 'marketing/emails/',
  MARK_EMAILS_AS_SPAM: 'marketing/emails/mark-as-spam',
  STAR_EMAILS: 'marketing/emails/star',
  SEND_SCHEDULED_EMAIL_NOW: 'marketing/emails/send-scheduled-email-now',

  // Form Builder
  CREATE_FORM: 'formBuilder/create',

  //Member
  GET_MEMBER: 'member',
  GET_MEMBER_WITH_RANK: 'member/rank_with',
  ADD_MEMBER: 'member',
  GET_MEMBER_BY_ID: 'member/memberId',
  UPDATE_MEMBER: 'member/memberId/',
  GET_MEMBER_TO_MEMBERSHIP: '/membership/memberId',

  // ** Member Rank
  GET_MEMBER_RANK: 'member-rank',
  GET_MEMBER_RANK_BY_ID: 'member-rank',

  // Ranking

  GET_RANKING: '/ranking/search',

  // Progression

  GET_PROGRESSION: '/progression/search',
  GET_UPDATE_PROGRESSION: '/progression/update/',
  GET_ADD_PROGRESSION: '/progression/add_progression_input/',
  GET_PROGRESSION_EVENT: '/progression/event/',

  // Event
  GET_EVENTS_DATA: '/event/events',
  // ** Event Registrant
  GET_EVENT_REGISTRANT: '/event/registrant/',
  GET_EVENT_REGISTRANT_BY_TYPE: '/event/registrant_by_type/',

  // ** Reporting
  GET_EVENT_REPORTING: '/event/reporting/',
  //Settings

  // ** Account

  GET_USER_PROFILE: 'user/profile',

  // ** Sport
  GET_SPORT: '/sport/sportsDetails/',

  // ** Category
  GET_ALL_SPORT_CATEGORY: '/sport-category/categoryDetails/',

  // ** Division
  GET_SPORT_CATEGORY_DIVISION: '/division-category/category_division_info/',
  CREATE_SPORT_CATEGORY_DIVISION: '/division-category/add_category_division/',
  UPDATE_SPORT_CATEGORY_DIVISION: '/division-category/update_category_division/',
  DELETE_SPORT_CATEGORY_DIVISION: '/division-category/delete_category_division/',

  // ** Rank
  GET_SPORT_CATEGORY_RANK: '/rank-category/category_rank_info/',
  CREATE_SPORT_CATEGORY_RANK: '/rank-category/add_category_rank/',
  UPDATE_SPORT_CATEGORY_RANK: '/rank-category/update_category_rank/',
  DELETE_SPORT_CATEGORY_RANK: '/rank-category/delete_category_rank/',

  //operators
  GET_OPERATOR_TABLE_DATA: '/user?userType=operator',
  GET_OPERATOR_BY_LOCATIONID: '/user/operator/',

  //admin
  GET_ADMIN_TABLE_DATA: '/user?userType=admin',
  GET_DASHBOARD_DATA: '/dashboard/getDashboardInfo',

  // admin - adminInfo
  GET_ADMIN_INFO_API: '/adminInfo/',
  SAVE_ADMIN_INFO_API: '/adminInfo/save',
  CHANGE_ADMIN_PASSWORD_API: '/adminInfo/changePassword',

  // admin - fileUpload
  UPLOAD_IMAGE_API: 'image/upload',
  IMAGE_API: 'image/',

  // admin - shop
  GET_PRODUCTS_BY_SHAPE_API: '/shop/getProductsByShape',
  GET_PRODUCTS_BY_CATEGORY_API: '/shop/getProductsByCategory',
  GET_PRODUCT_DETAIL_API: '/shop/',

  // admin - product
  GET_PRODUCT_LIST: '/products/getList',
  GET_PRODUCT_TYPE_LIST: '/products/getTypeList',
  CREATE_PRODUCT: '/products/',
  GET_PRODUCT_BY_ID: '/products/',
  SIMLIAR_PRODUCTS: '/similar',
  OVERVIEW_PRODUCT: '/overview',
  FAQ_PRODUCT: '/faq',
  SPEC_AND_TEMPLATE_PRODUCT: '/specsAndTemplate',
  OPTION_PRODUCT: '/options',
  REVIEW_AND_RATING_PRODUCT: '/reviewAndRating',

  // admin - category
  GET_CATEGORIES: '/categories',
  GET_SUB_CATEGORIES: 'subCategories',
  CREATE_CATEGORY: '/categories',

  // admin - auth
  USER_CHANGE_PASSWORD: '/auth/userChangePassword',

  // admin - paperType
  GET_PAPER_TYPE_LIST: '/paperType',
  CREATE_PAPER_TYPE: '/paperType',

  // admin - lockProductArea
  GET_LOCK_PRODUCT_AREA_API: '/lockProductArea',

   // admin - user
   GET_USER_API: '/user',

   // admin - productTemplate
   GET_PRODUCT_TEMPLATE_API: '/productTemplate',
   GET_PRODUCT_TEMPLATE_By_ID_API: '/productTemplate/',

   // admin - orderStatus
   GET_ORDER_STATUS_API: '/orderStatus',

   // admin - transaction
   GET_TRANSACTION_API: '/transaction',

   // admin - invoice
   GET_INVOICE_API: '/invoice',

   // admin - settings
   GET_ADMIN_BASIC_INFO: '/settings/getBasicInfo',
   RESET_PASSWORD: '/settings/resetPassword',

  //location
  GET_LOCATION_DATA: '/location',
  ADD_LOCATION: '/location',
  GET_LOCATION_BY_ID: '/location/locationId/',
  UPDATE_LOCATION: '/location/locationId/',

  //memberships-Type
  POST_MEMBERSHIP: '/membership-type',
  GET_MEMBERSHIP: '/membership-type',
  EDIT_MEMBERSHIP: '/membership-type/membershipTypeId/',
  GET_MEMBERSHIP_BY_ID: '/membership-type/membershipTypeId/',

  //membership
  POST_MEMBERSHIP_MEMBER: '/membership',
  GET_MEMBERSHIPS: '/membership'
};
