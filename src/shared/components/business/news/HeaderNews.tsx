type Props = {
    className?: string
}
const HeaderNews = ({className}: Props) => {
  return (
    <section id='HeaderNews' className={`mt-10 relative w-full rounded-lg ${className}`}>
        <div className="w-full justify-between items-start">
            <p className="font-normal text-base">Danh mục: Tất cả</p>
        </div>
    </section>
    )
};

export default HeaderNews;
