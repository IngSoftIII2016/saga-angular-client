/**
 * Created by juan on 06/11/16.
 */
import {
    Component, Input, AfterViewInit, DoCheck, OnDestroy, ElementRef, IterableDiffers, Output,
    EventEmitter
} from '@angular/core';
import {Observable} from "rxjs";

declare var jQuery: any;

@Component({
    selector: 'timeline-day-schedule',
    template: `
        <div [ngStyle]="style" [class]="styleClass"></div>
    `
})
export class TimelineDaySchedule implements AfterViewInit, DoCheck, OnDestroy {

    @Input() resources: Observable<any[]>;

    @Input() events: any[];

    @Input() header: any;

    @Input() buttonText: any;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() rtl: boolean;

    @Input() weekends: boolean;

    @Input() hiddenDays: number[];

    @Input() fixedWeekCount: boolean;

    @Input() weekNumbers: boolean;

    @Input() businessHours: any;

    @Input() height: any;

    @Input() contentHeight: any;

    @Input() aspectRatio: number = 1.35;

    @Input() eventLimit: any;

    @Input() defaultDate: any;

    @Input() editable: boolean;

    @Input() eventStartEditable: boolean;

    @Input() eventDurationEditable: boolean;

    @Input() defaultView: string = 'timelineDay';

    @Input() allDaySlot: boolean = true;

    @Input() allDayText: string = 'all-day';

    @Input() slotDuration: any = '00:15:00';

    @Input() slotLabelInterval: any;

    @Input() snapDuration: any;

    @Input() scrollTime: any = '09:00:00';

    @Input() minTime: any = '08:00:00';

    @Input() maxTime: any = '21:30:00';

    @Input() slotEventOverlap: boolean = true;

    @Input() nowIndicator: boolean = true;

    @Input() dragRevertDuration: number = 500;

    @Input() dragOpacity: number = .75;

    @Input() dragScroll: boolean = true;

    @Input() eventOverlap: any;

    @Input() eventConstraint: any;

    @Input() locale: any;

    @Input() eventRender: Function;

    @Output() onDayClick: EventEmitter<any> = new EventEmitter();

    @Output() onEventClick: EventEmitter<any> = new EventEmitter();

    @Output() onEventMouseover: EventEmitter<any> = new EventEmitter();

    @Output() onEventMouseout: EventEmitter<any> = new EventEmitter();

    @Output() onEventDragStart: EventEmitter<any> = new EventEmitter();

    @Output() onEventDragStop: EventEmitter<any> = new EventEmitter();

    @Output() onEventDrop: EventEmitter<any> = new EventEmitter();

    @Output() onEventResizeStart: EventEmitter<any> = new EventEmitter();

    @Output() onEventResizeStop: EventEmitter<any> = new EventEmitter();

    @Output() onEventResize: EventEmitter<any> = new EventEmitter();

    @Output() viewRender: EventEmitter<any> = new EventEmitter();

    @Output() onDayChanged: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    stopNgOnChangesPropagation: boolean;

    differ: any;

    options: any;

    schedule: any;

    constructor(public el: ElementRef, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
        this.initialized = false;

    }

    ngAfterViewInit() {
        let element = this.el.nativeElement.children[0];
        this.schedule = jQuery(element);
        let self = this;
        this.resources
            //.do(resources => console.log(resources))
            .subscribe(resources => self.initSchedule(resources, element));
    }

    private initSchedule(resources: any[], element: any) {

        this.initialized = false;
        this.schedule.fullCalendar( 'destroy' );
        this.options = {
            theme: true,
            header: this.header,
            buttonText: this.buttonText,
            isRTL: this.rtl,
            weekends: this.weekends,
            hiddenDays: this.hiddenDays,
            fixedWeekCount: this.fixedWeekCount,
            weekNumbers: this.weekNumbers,
            businessHours: this.businessHours,
            height: this.height,
            contentHeight: this.contentHeight,
            aspectRatio: this.aspectRatio,
            eventLimit: this.eventLimit,
            defaultDate: this.defaultDate,
            editable: this.editable,
            eventStartEditable: this.eventStartEditable,
            eventDurationEditable: this.eventDurationEditable,
            defaultView: this.defaultView,
            allDaySlot: this.allDaySlot,
            allDayText: this.allDayText,
            slotDuration: this.slotDuration,
            slotLabelInterval: this.slotLabelInterval,
            snapDuration: this.snapDuration,
            scrollTime: this.scrollTime,
            minTime: this.minTime,
            maxTime: this.maxTime,
            slotEventOverlap: this.slotEventOverlap,
            nowIndicator: this.nowIndicator,
            dragRevertDuration: this.dragRevertDuration,
            dragOpacity: this.dragOpacity,
            dragScroll: this.dragScroll,
            eventOverlap: this.eventOverlap,
            eventConstraint: this.eventConstraint,
            eventRender: this.eventRender,
            resources: resources,
            resourceLabelText: 'Aulas',
            timeFormat: 'H(:mm)',
            timezone: 'local',
            titleFormat: '[Clases y Eventos del] dddd D MMMM YYYY',
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            events: (start, end, timezone, callback) => {
                this.onDayChanged.emit({
                    'day': start.local().toDate(),
                    'timezone': timezone,
                    'callback': callback
                });
            },
            dayClick: (date, jsEvent, view) => {
                this.onDayClick.emit({
                    'date': date,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventClick: (calEvent, jsEvent, view) => {
                this.onEventClick.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseover: (calEvent, jsEvent, view) => {
                this.onEventMouseover.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseout: (calEvent, jsEvent, view) => {
                this.onEventMouseout.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStart: (event, jsEvent, ui, view) => {
                this.onEventDragStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStop: (event, jsEvent, ui, view) => {
                this.onEventDragStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDrop: (event, delta, revertFunc, jsEvent, ui, view) => {
                this.onEventDrop.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStart: (event, jsEvent, ui, view) => {
                this.onEventResizeStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStop: (event, jsEvent, ui, view) => {
                this.onEventResizeStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResize: (event, delta, revertFunc, jsEvent, ui, view) => {
                this.onEventResize.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            viewRender: (view, element) => {
                this.viewRender.emit({
                    'view': view,
                    'element': element
                });
            }
        };

        if (this.locale) {
            for (var prop in this.locale) {
                this.options[prop] = this.locale[prop];
            }
        }
        this.schedule.fullCalendar(this.options);
        this.initialized = true;
    }

    ngDoCheck() {
        let changes = this.differ.diff(this.events);

        if (this.schedule && changes) {
            this.schedule.fullCalendar('refetchEvents');
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).fullCalendar('destroy');
        this.initialized = false;
        this.schedule = null;
    }

    getOptions(): any {
        let o = {};
        Object.assign(o, this.options);
        return o;
    }

    updateOptions(options: any) {
        Object.assign(this.options, options);
        this.schedule.fullCalendar(this.options);
    }

    gotoDate(date: any) {
        this.schedule.fullCalendar('gotoDate', date);
    }

    prev() {
        this.schedule.fullCalendar('prev');
    }

    next() {
        this.schedule.fullCalendar('next');
    }

    prevYear() {
        this.schedule.fullCalendar('prevYear');
    }

    nextYear() {
        this.schedule.fullCalendar('nextYear');
    }

    today() {
        this.schedule.fullCalendar('today');
    }

    incrementDate(duration: any) {
        this.schedule.fullCalendar('incrementDate', duration);
    }

    getDate() {
        return this.schedule.fullCalendar('getDate');
    }

    refetchEvents() {
        this.schedule.fullCalendar('refetchEvents');
    }

}
