import { GithubIcon, MailIcon, VelogIcon } from './icons';

export type ContactType = 'email' | 'github' | 'velog';

const icons: Record<ContactType, React.FC<React.ComponentProps<'svg'>>> = {
  email: MailIcon,
  github: GithubIcon,
  velog: VelogIcon,
};

export function ContactsIcon({
  contact,
  ...props
}: React.ComponentProps<'svg'> & { contact: ContactType }) {
  const Component = icons[contact];

  return <Component {...props} />;
}
