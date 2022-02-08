const HOST = window.location.host;
const DATABASE_URL = HOST;
const STATUS: string[] = ['ALLOCATED', 'AVAILABE', 'BLOCKED', 'LEAVE'];

const STATUS_LIST: any = [
  {
    text: 'ALLOCATED',
    value: 'A',
  },
  {
    text: 'AVAILABE',
    value: 'V',
  },
  {
    text: 'BLOCKED',
    value: 'B',
  },
  {
    text: 'LEAVE',
    value: 'L',
  },
];

const STATUS_CODE: string[] = ['A', 'V', 'B', 'L'];

const ROLE: string[] = ['AD', 'AM', 'RM', 'HR', 'L'];
const ROLE_NAME: string[] = [
  'Admin',
  'Account Manager',
  'Resource Manager',
  'Human Resources',
  'LeaderShip',
];
const COLORS: string[] = ['magenta', 'cyan', 'lime', 'green'];
const CONSTANTS = {
  HOST,
  DATABASE_URL,
  STATUS,
  STATUS_CODE,
  ROLE,
  COLORS,
  STATUS_LIST,
  ROLE_NAME,
};
export default CONSTANTS;
