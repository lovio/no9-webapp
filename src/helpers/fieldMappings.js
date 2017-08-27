export function getTestTitle(type) {
  switch (type) {
    case 'reading':
      return '阅读';
    case 'listening':
      return '听力';
    case 'speaking':
      return '口语';
    case 'writing':
      return '写作';
    default:
      return '';
  }
}

export function getSubjectId(type) {
  switch (type) {
    case 'reading':
      return 1;
    case 'listening':
      return 2;
    case 'speaking':
      return 3;
    case 'writing':
      return 4;
    default:
      return '';
  }
}

export function getTypeBySubjectId(subjectId) {
  switch (subjectId) {
    case 1:
      return 'reading';
    case 2:
      return 'listening';
    case 3:
      return 'speaking';
    case 4:
      return 'writing';
    default:
      return '';
  }
}

export function getTypeNameBySubjectId(subjectId) {
  switch (+subjectId) {
    case 1:
      return '阅读';
    case 2:
      return '听力';
    case 3:
      return '口语';
    case 4:
      return '写作';
    default:
      return '';
  }
}
