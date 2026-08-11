import StatisticCard from './StatisticCard'

function StatisticsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-3">
        <StatisticCard label="Profiles created" value="8.2K" accent />
        <StatisticCard label="Placement-ready students" value="5.6K" />
        <StatisticCard label="Resume approvals" value="4.9K" />
      </div>
    </section>
  )
}

export default StatisticsSection
