import { Container } from '@/components/shared';
import css from './profileSection.module.scss';
import { User } from '@prisma/client';
import { ProfileForm } from '@/components/entities';
import { CircleCheck } from 'lucide-react';

interface IProps {
  user: User;
}

export const ProfileSection = ({ user }: IProps) => {
  const createdMonth = user.createdAt.getUTCMonth() + 1; // months from 1-12
  const createdDay = user.createdAt.getUTCDate();
  const createdYear = user.createdAt.getUTCFullYear();

  const updatedMonth = user.updatedAt.getUTCMonth() + 1; // months from 1-12
  const updatedDay = user.updatedAt.getUTCDate();
  const updatedYear = user.updatedAt.getUTCFullYear();
  return (
    <section className={css.profileSection}>
      <Container>
        <div className={css.profileContainer}>
          <div className={css.profileInfo}>
            <h3 className={css.title}>Profile info:</h3>
            <div className={css.profileCard}>
              <p>
                Name: <span className={css.info}>{user.name}</span>
              </p>
              <p>
                Email: <span className={css.info}>{user.email}</span>
              </p>
              <p>
                Role: <span className={css.info}>{user.role}</span>
              </p>
              <p>
                Created at: {`${createdDay}.${createdMonth}.${createdYear}`}
              </p>
              <p>
                Updated at: {`${updatedDay}.${updatedMonth}.${updatedYear}`}
              </p>
              {user.verified ? (
                <div className={css.badge}>
                  Verified
                  <CircleCheck
                    className={css.icon}
                    size={24}
                  />
                </div>
              ) : (
                <div>Not verified</div>
              )}
            </div>
          </div>
          <ProfileForm user={user} />
        </div>
      </Container>
    </section>
  );
};
