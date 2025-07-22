import GithubIcon from '@/components/icons/GithubIcon';
import MailIcon from '@/components/icons/MailIcon';
import VelogIcon from '@/components/icons/VelogIcon';

export type ContactType = 'email' | 'github' | 'velog';

const icons: Record<ContactType, React.FC<React.ComponentProps<'svg'>>> = {
  email: MailIcon,
  github: GithubIcon,
  velog: VelogIcon,
};

export default function ContactsIcon({
  contact,
  ...props
}: React.ComponentProps<'svg'> & { contact: ContactType }) {
  const Component = icons[contact];

  return <Component {...props} />;
}
