import { atom } from 'recoil'

export const countState = atom({
    key:'countState',
    default:0
})
export const jobState = atom({
    key:'jobState',
    default:[]
})
export const resumeText = atom({
    key:'resumeText',
    default:null
})
export const signin = atom({
    key:'signin',
    default:false
})
export const companyNameState = atom({
    key: 'companyNameState',
    default: '',
  });
  
  export const jobTitleState = atom({
    key: 'jobTitleState',
    default: '',
  });
  
  export const jobDescriptionState = atom({
    key: 'jobDescriptionState',
    default: '',
  });
  
  export const jobStatusState = atom({
    key: 'jobStatusState',
    default: 'Applied', // Default status
  });