import Navbar from "../../components/Navbar";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from "../../ui/project.module.css"


export default function ProjectPage() {
  return (
    <>
      <Navbar />
      <SkeletonTheme baseColor="#C1C1C1" highlightColor="#D3D3D3">
        <section className={styles.project}>
        <div className={styles.project__intro}>
          <div>
            <Skeleton count={2} height={70} width={710} />
            <p><Skeleton count={3}/> <Skeleton width={200}/></p>
          </div>
            <Skeleton width={600} height={496} />
          </div>
        </section>
      </SkeletonTheme>
    </>
  );
}
