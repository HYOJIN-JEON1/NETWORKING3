import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import TagCard from '../components/TagCard';
import ConnectionSettings from '../components/ConnectionSettings';
import Inbox from '../components/Inbox';

const mockProfile = {
  name: '홍길동',
  cohort: '3기',
  company: 'KDT Corp',
  position: '데이터 엔지니어',
  bio: '데이터로 더 나은 세상을 만드는 데 관심 있습니다.',
  photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
};

const mockTags = {
  skill: ['Python', 'SQL', '머신러닝'],
  interest: ['금융AI', '블록체인'],
  help: ['커리어상담', '이력서검토']
};

const tagSuggestions = {
  skill: ['Python', 'SQL', '머신러닝', 'AWS', 'React'],
  interest: ['금융AI', '블록체인', '헬스케어데이터'],
  help: ['커리어상담', '이력서검토', '사이드프로젝트_조언', 'IR자료_피드백']
};

const mockSettings = [
  { key: 'fintechChat', label: '핀테크 후배들의 1:1 커피챗 요청을 받겠습니다.', description: '재학생 및 졸업생들이 프로필을 보고 1:1 대화(온/오프라인)를 신청할 수 있습니다.', value: true },
  { key: 'ceoChat', label: 'CEO 원우/동문의 커피챗 요청을 받겠습니다.', description: '', value: false },
  { key: 'jobOffer', label: '채용 및 프로젝트 제안을 받겠습니다.', description: '동문 및 CEO 기업으로부터 비공개 채용/프로젝트 제안을 받을 수 있습니다.', value: true },
  { key: 'lectureOffer', label: '과정 특강 강사/조교 제안에 관심 있습니다.', description: '', value: false }
];

const mockReceived = [
  { id: '1', type: '커피챗', from: '김KDT', message: '커피챗 요청드립니다!', status: 'pending' },
  { id: '2', type: '채용', from: '이CEO', message: '채용 제안이 있습니다.', status: 'accepted' }
];
const mockSent = [
  { id: '3', type: '커피챗', from: '박동문', message: '', status: 'pending' }
];

export default function MyPage() {
  const [profile, setProfile] = useState(mockProfile);
  const [tags, setTags] = useState(mockTags);
  const [settings, setSettings] = useState(mockSettings);
  const [received, setReceived] = useState(mockReceived);
  const [sent] = useState(mockSent);

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2>마이페이지</h2>
      <ProfileCard profile={profile} onEdit={() => {}} />
      <div style={{ display: 'flex', gap: 16, margin: '16px 0' }}>
        <TagCard type="skill" tags={tags.skill} onAdd={t => setTags({ ...tags, skill: [...tags.skill, t] })} onRemove={t => setTags({ ...tags, skill: tags.skill.filter(x => x !== t) })} suggestions={tagSuggestions.skill} />
        <TagCard type="interest" tags={tags.interest} onAdd={t => setTags({ ...tags, interest: [...tags.interest, t] })} onRemove={t => setTags({ ...tags, interest: tags.interest.filter(x => x !== t) })} suggestions={tagSuggestions.interest} />
        <TagCard type="help" tags={tags.help} onAdd={t => setTags({ ...tags, help: [...tags.help, t] })} onRemove={t => setTags({ ...tags, help: tags.help.filter(x => x !== t) })} suggestions={tagSuggestions.help} />
      </div>
      <ConnectionSettings settings={settings} onToggle={key => setSettings(settings.map(s => s.key === key ? { ...s, value: !s.value } : s))} />
      <Inbox received={received} sent={sent} onAccept={id => setReceived(received.map(r => r.id === id ? { ...r, status: 'accepted' } : r))} onReject={id => setReceived(received.map(r => r.id === id ? { ...r, status: 'rejected' } : r))} />
    </div>
  );
} 