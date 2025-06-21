import CalendarHeatmap from "react-calendar-heatmap";
import 'react-calendar-heatmap/dist/styles.css';
import { subDays, format } from 'date-fns';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function CommitHeatmap({ commitdata }) {

    const today = new Date();
    const oneYearAgo = subDays(today, 365);

    const values = commitdata;

    return (
        <div className="my-4 mx-6 px-4 bg-white shadow-md rounded-xl">
            <h2 className="text-xl font-bold mb-4 pt-4 pl-4">Commit Activity</h2>
            <CalendarHeatmap
                startDate={oneYearAgo}
                endDate={today}
                values={values}
                classForValue={(value) => {
                    if (!value) return "color-empty";
                    if (value.count >= 4) return "color-scale-4";
                    if (value.count >= 3) return "color-scale-3";
                    if (value.count >= 2) return "color-scale-2";
                    if (value.count >= 1) return "color-scale-1";
                    return "color-empty";
                }}
                tooltipDataAttrs={(value) =>
                    value.date
                        ? {
                            'data-tooltip-id': 'commit-tooltip',
                            'data-tooltip-content': `${value.date}: ${value.count} commits`
                        }
                        : {}
                }
                showWeekdayLabels
            />
            <Tooltip
                id="commit-tooltip"
                style={{
                    backgroundColor: '#1e1e2f',   
                    color: '#ffffff',             
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.2)'
                }}
                place="top" 
                delayShow={100}
            />

        </div>
    );
}