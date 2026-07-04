export const ctaStates = {
  hidden: { label: '', target: '#top', visible: false },
  learn: { label: '구조 먼저 보기', target: '#process', visible: true },
  verify: { label: '실제 자료 확인하기', target: '#proof', visible: true },
  self_assess: { label: '내 상황에 적용되는지 보기', target: '#consult', visible: true },
  consult: { label: '1:1 설명 예약하기', target: '#consult', visible: true },
};

export const formContract = {
  mode: 'demo',
  endpoint: '',
  phonePattern: /^010-\d{4}-\d{4}$/,
  messages: {
    name: '이름을 입력해 주세요.',
    phone: '010-0000-0000 형식의 연락처를 입력해 주세요.',
    consent: '상담을 위해 개인정보 수집·이용 동의가 필요합니다.',
    integration: '데모 모드입니다. 상담 접수 서버 연결 후 전송할 수 있습니다.',
  },
};

export const analytics = {
  track() {},
};
