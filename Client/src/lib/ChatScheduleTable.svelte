<script lang="ts">
  import type { Schedule, ScheduleDay, SubjectSlot } from "../schedule";

  export let schedule: Schedule;

  const getSlotBuckets = (schedule: Schedule) => {
    let slotBuckets: (SubjectSlot | undefined)[][] = [];
    for (let i = 0; i < 6; i++) {
      slotBuckets.push([
        schedule.days[0].find((x) => x.slotIndex == i),
        schedule.days[1].find((x) => x.slotIndex == i),
        schedule.days[2].find((x) => x.slotIndex == i),
        schedule.days[3].find((x) => x.slotIndex == i),
        schedule.days[4].find((x) => x.slotIndex == i),
      ]);
    }
    return slotBuckets;
  };

  $: slotBuckets = getSlotBuckets(schedule);

  const scheduleDisplays = [
    "10:30-11:25",
    "11:30-12:25",
    "12:30-1:25",
    "2:00-2:55",
    "3:00-3:55",
    "4:00-4:55",
    "5:00-5:55",
  ];
</script>

<table class="chat-table">
  <thead>
    <th>Time</th>
    <th>Monday</th>
    <th>Tuesday</th>
    <th>Wednesday</th>
    <th>Thursday</th>
    <th>Friday</th>
  </thead>
  <tbody>
    {#each slotBuckets as slot, i}
      {#if i === 3}
        <tr>
          <td>1:30-2:00</td>
          <td colspan="5">RECESS</td>
        </tr>
      {/if}
      <tr>
        <td>{scheduleDisplays[i]}</td>
        {#each slot.slice(0, 5) as slotSubject}
          {#if slotSubject !== undefined}
            <td rowspan={slotSubject.duration}>
              {slotSubject.subjectCode} -
              {slotSubject.facultyName}
            </td>
          {/if}
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .chat-table tr,
  td,
  th {
    border: 1px solid black;
    padding: 0.7em;
    text-align: center;
  }
</style>
