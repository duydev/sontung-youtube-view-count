type Props = {
  wikipediaUrl: string
}

export function ArtistInfoCard({ wikipediaUrl }: Props) {
  return (
    <section className="card">
      <h2 className="sectionTitle">Nghệ sĩ</h2>

      <div className="artist">
        <div className="artistName">Sơn Tùng M-TP</div>
        <div className="artistBio">
          Nguyễn Thanh Tùng (sinh ngày 5 tháng 7 năm 1994), thường được biết đến với nghệ danh Sơn
          Tùng M-TP, là một nam ca sĩ kiêm nhạc sĩ sáng tác bài hát, nhà sản xuất thu âm, rapper và
          diễn viên người Việt Nam. Nổi tiếng vì tầm ảnh hưởng sâu rộng đối với âm nhạc Việt Nam,
          anh được mệnh danh là &quot;Hoàng tử V-pop&quot;.
        </div>

        <a className="artistLink" href={wikipediaUrl} target="_blank" rel="noreferrer">
          Nguồn: Wikipedia
        </a>
      </div>
    </section>
  )
}
